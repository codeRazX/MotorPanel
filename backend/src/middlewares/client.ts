import { RequestHandler } from "express";
import Client from "../models/Client";
import { throwNewError } from "../utils";

export const existsClient : RequestHandler = async (req, res, next) => {
  const {clientId} = req.params
  const client = await Client.findOne({manager: req.user?.id ,_id: clientId})
   .select('-manager')
   .populate({
      path: 'services',
      select: '_id vehicle total status repairs createdAt dateCompleted serviceNumber symptoms',
      options: { sort: { createdAt: -1 } },
        populate: {
          path: 'employees',
          select: 'name slug _id'
        }
  }).populate('notes', '_id content')
  

  if (!client) {
    return throwNewError(next, 'Hubo un error al completar la acción. El elemento al que intentas acceder no existe', 404)
  }

  req.client = client
  next()
  
}