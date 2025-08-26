import 'dotenv/config'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { throwNewError } from '../utils'
import User from '../models/User'
import { generateJWTandSendCookie, shouldRefreshToken } from '../utils/jwt'

export const authenticateWithJWT : RequestHandler = async (req, res, next) => {
  const {jwt: token} = req.cookies

  if (!token){
    return throwNewError(next, 'No autorizado: Sesión expiró', 401)
  }

  try{
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY))
    if (typeof decoded === 'object' && decoded.id){
     
      const user = await User.findById(decoded.id).select('_id name email')
      
      if (!user){
        return throwNewError(next, 'No autorizado: No tienes permiso para realizar esta acción', 401)
      }
      
      req.user = user
      if (shouldRefreshToken(decoded.exp)){
        generateJWTandSendCookie(res, user.id)
      }
      return next()
    }

   return throwNewError(next, 'No autorizado: No tienes permiso para realizar esta acción', 401)
  }
  catch(error){
    return throwNewError(next, 'No autorizado: Sesión expiró', 401);
  }
}