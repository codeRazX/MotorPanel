import { RequestHandler } from "express";
import Employee from "../models/Employees";
import { capitalizeName, deleteNotes, keyDelete, normalizeString, throwNewError } from "../utils";
import Service from "../models/Service";
import envOptions from "../config/envOptions";

export default class EmployeController {
 
  static createEmployee : RequestHandler = async (req, res, next) => {
    const {name} = req.body
    const existsEmployee = await Employee.findOne({name: normalizeString(name), manager: req.user?.id})
    if (existsEmployee) return throwNewError(next, 'Este empleado ya existe en el sistema', 400)

    await Employee.create({
      ...req.body,
      name: normalizeString(name),
      slug: capitalizeName(name),
      manager: req.user?.id
    });
    res.status(201).send('Nuevo empleado registrado con éxito')
  }

  static getEmployees : RequestHandler = async (req, res, next) => {
    const page = req.page!
    const filters = req.filters!

    const [employees, countDocuments] = await Promise.all([
        Employee.find(filters)
        .select('_id name slug role available')
        .sort({available: -1, name: 'asc'})
        .limit( envOptions.limit_page )
        .skip((page - 1) *  envOptions.limit_page )
        .lean(),

        Employee.find(filters).countDocuments()
      ])
  
    return res.status(200).json({data: employees, count: countDocuments, limit: envOptions.limit_page })
  }


  static getEmployeesAvailable : RequestHandler = async (req, res, next) => {
    const employees = await Employee.find({manager: req.user?.id, available: true})
    .sort({name: 'asc'})
    .select('_id name slug')
    .lean()
    
    res.status(200).json(employees)
  }

  static getEmployeeById : RequestHandler = async (req, res, next) => res.status(200).json(req.employee)

  static updatedEmployee : RequestHandler = async (req, res, next) => {
    const employee = req.employee!
    const {available, ...data} = req.body

    const existsEmployee = await Employee.findOne({name: normalizeString(data.name), manager: req.user?.id})
    if (existsEmployee && existsEmployee.id.toString() !== employee.id.toString()) {
      return throwNewError(next, 'Este cliente ya está registrado en el sistema', 401)
    }
   
    Object.assign(employee, {
      ...data,
      name: normalizeString(data.name),
      slug: capitalizeName(data.name)
    })
   
    if (!employee.available && available) {
      const serviceToUpdate = await Service.findOneAndUpdate({
        manager: req.user?.id, 
        employees: employee.id,
      }, {$pull: {employees: employee.id}})
    
      if (! serviceToUpdate) return throwNewError(next, 'Hubo un error al completar la acción', 403)
      employee.services = []
      employee.available = true
    } 
   
    await employee.save()
    res.status(201).send('Empleado actualizado con éxito')
  }

  static deleteEmployee : RequestHandler = async (req, res, next) => {
    const employee = req.employee!
    const {key} = req.query
    const employeeId = employee.id

    if (key !== keyDelete.employee) {
      return throwNewError(next, 'Debes confirmar la acción para continuar', 401)
    }


    await Promise.all([
      deleteNotes(employee, req.user),
      Service.updateMany({
        manager: req.user?.id,
        employees: employeeId
      }, {$pull: {employees: employeeId}}),
      employee.deleteOne()
    ])
    
    return res.status(200).send('Empleado eliminado correctamente')
  }
}
