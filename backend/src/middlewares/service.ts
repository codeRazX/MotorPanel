import { RequestHandler } from "express";
import Service from "../models/Service";
import { throwNewError } from "../utils";

export const existsService : RequestHandler= async (req, res, next) => {
  const {serviceId} = req.params
  
  const service = await Service.findOne({manager: req.user?.id, _id: serviceId})
  .select('-manager')
  .populate('client', 'name _id slug contact')
  .populate('employees', '_id slug name')
  .populate('notes', '_id content')

  if (!service) return throwNewError(next, 'Hubo un error al completar la acción. El elemento al que intentas acceder no existe', 404)
  
  req.service = service
  next()
}