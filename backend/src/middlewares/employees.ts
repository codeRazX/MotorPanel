import { RequestHandler } from "express";
import Employee from "../models/Employees";
import mongoose from "mongoose";
import { throwNewError } from "../utils";

export const validateEmployees : RequestHandler = async (req, res, next) => {
  const {employees} = req.body

  if (!Array.isArray(employees)){
    return throwNewError(next, 'Hubo un problema al asignar los empleados. Revise los datos', 400)
  }
    
  if (employees.length){
    if (!employees.every((employee) => mongoose.Types.ObjectId.isValid(employee.value))){
      return throwNewError(next, 'Hubo un problema al asignar los empleados. Revise los datos', 400)
    }
    const employeeIds = employees.map(emp => emp.value);
    const employeesList = await Employee.find({manager: req.user?.id, _id: { $in: employeeIds }});
    if ((employeesList.length !== employeeIds.length)){
      return throwNewError(next, 'Al menos un empleado no está registrado en el sistema', 401)
    }

    req.employees = employeesList
    return next()
  }
    
  req.employees = employees
  next()
}