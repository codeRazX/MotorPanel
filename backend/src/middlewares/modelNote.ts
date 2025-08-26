import { RequestHandler } from "express";
import { throwNewError } from "../utils";
import Service from "../models/Service";
import Employee from "../models/Employees";
import Client from "../models/Client";

export const modelNote : RequestHandler = async (req, res, next) => {
  let documentToAddNote = null;

  const {model} = req.query
  if (!model || !['service', 'client', 'employee'].includes(model as string)) {
    return throwNewError(next, 'Hubo un error al registrar la nota', 404)
  }
  
  const {itemId} = req.params

  switch (model){
    case 'service': 
      documentToAddNote = await Service.findOne({manager: req.user?.id, _id: itemId})
    break;
    case 'client':
      documentToAddNote = await Client.findOne({manager: req.user?.id, _id: itemId})
    break;
    case 'employee':
      documentToAddNote = await Employee.findOne({manager: req.user?.id, _id: itemId})
    break;
  }

  if (!documentToAddNote) {
    return throwNewError(next, 'Hubo un error al registrar la nota', 404)
  }

  req.modelNote = documentToAddNote
  next()

}