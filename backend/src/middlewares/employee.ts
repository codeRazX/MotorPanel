import { RequestHandler } from "express";
import Employee from "../models/Employees";
import { throwNewError } from "../utils";

export const existsEmployee : RequestHandler = async (req, res, next) => {
  const {employeeId} = req.params
  const employee = await Employee.findOne({manager: req.user?.id, _id: employeeId})
  .populate({
    path: 'services',
    select: '_id vehicle status createdAt dateCompleted serviceNumber symptoms',
      populate: {
        path: 'client',
        select: 'name slug _id'
      }
  })
  .populate('notes', '_id content')
  .select('-manager')

  if (!employee) {
    return throwNewError(next, 'Hubo un error al completar la acción. El elemento al que intentas acceder no existe', 404)
  }

  req.employee = employee
  next()
}