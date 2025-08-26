import { RequestHandler } from "express";
import User from "../models/User";
import { comparePassword, hashPassword, throwNewError } from "../utils";
import { clearCookie, generateJWTandSendCookie } from "../utils/jwt";

export default class AuthController {

  static createAccount : RequestHandler = async (req, res, next) => {
  
    const {confirm_password, ...data} = req.body
    const existsEmail = await User.findOne({email: data.email})
    if (existsEmail) {
      return throwNewError(next, 'Ya existe una cuenta registrada con este correo', 409)
    }
    const hashedPassword = await hashPassword(data.password)
    await User.create({
      ...data,
      password: hashedPassword
    })

    return res.status(201).json('Cuenta registrada con éxito')
  }

  static login : RequestHandler = async (req, res, next) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (!user || !await comparePassword(password, user.password) ) {
      return throwNewError(next, 'Inicio de sesión fallido. Datos incorrectos', 404)
    }
    generateJWTandSendCookie(res, user.id)
    return res.status(200).send('Iniciando sesion...')
  }

  static userAuthentication: RequestHandler = async (req, res, next) => res.status(200).json(req.user)
  

  static logout : RequestHandler = async (req, res, next) => {
    clearCookie(res)
    res.status(200).send('Cerrando sesión')
  }

  static updateProfile: RequestHandler = async (req, res, next) => {
    const {name, email} = req.body
    const user = req.user!

    const existsUser = await User.findOne({email})
    if (existsUser && existsUser.id.toString() !== user.id.toString()) {
      return throwNewError(next, 'Ya existe una cuenta registrada con este correo', 409)
    }

    if (name === user.name && email === user.email){
      return res.status(201).send('Perfil actualizado con éxito')
    }

    await User.updateOne({
      _id: user.id,
      name,
      email
    })
    
    return res.status(201).send('Perfil actualizado con éxito')
  }
  
  static updateProfilePassword: RequestHandler = async (req, res, next) => {
    const {password, current_password} = req.body
    const user = await User.findById(req.user?.id)
    if (!user) return throwNewError(next, 'No se pudo completar la acción', 401)
      
    if (!await comparePassword(current_password, user.password)) {
      return throwNewError(next, 'La contraseña actual es incorrecta', 404)
    }
    
   user.password = await hashPassword(password)
   await user.save()
   res.status(201).send('Contraseña modificada con éxito')
  }
}