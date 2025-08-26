import { RequestHandler } from "express";
import Client from "../models/Client";
import { capitalizeName, deleteNotes, keyDelete, normalizeString, throwNewError } from "../utils";
import Service from "../models/Service";
import Employee from "../models/Employees";
import envOptions from "../config/envOptions";

export default class ClientController {


  static getClients : RequestHandler = async (req, res, next) => {
    const page = req.page!
    const filters = req.filters!
   
    const [clients, countDocuments] = await Promise.all([
      Client.find(filters)
      .select('_id name slug services regularCustomer vehicles')
      .sort({name: 'asc'})
      .limit( envOptions.limit_page )
      .skip((page - 1) * envOptions.limit_page)
      .lean(),
      Client.find(filters).countDocuments()
    ])
      
    return res.status(200).json({data: clients, count: countDocuments, limit: envOptions.limit_page })
  }

  static getSuggestedClients : RequestHandler = async (req, res, next) => {
    
    const clients = await Client.find({manager: req.user?.id})
    .select('_id name slug services regularCustomer vehicles')
    .sort({name: 'asc'})
    .lean()
    
    return res.status(200).json(clients)
  }


  static getClientById : RequestHandler = async (req, res, next) => res.status(200).json(req.client)

  static updateClient : RequestHandler = async (req, res, next) => {
    const {vehicles, vehicles_remove ,...data} = req.body
    const client = req.client!

    const existsClient = await Client.findOne({manager: req.user?.id, name: normalizeString(data.name)})
    if (existsClient && existsClient.id.toString() !== client.id.toString()){
      return throwNewError(next, 'Este cliente ya está registrado en el sistema', 401)
    }

    Object.assign(client, {
      ...data,
      name: normalizeString(data.name),
      slug: capitalizeName(data.name)
    })
       
    if (vehicles){
      client.vehicles.push(vehicles)
    }
    if (vehicles_remove.length){
      client.vehicles = client.vehicles.filter(v => !vehicles_remove.includes(v))
    }

    await client.save()
    return res.status(201).send('Información del cliente actualizada')
  }

  static deleteClient : RequestHandler = async (req, res, next) => {
    const client = req.client!
    const {key} = req.query
    const clientId = client.id

    if (key !== keyDelete.client) {
      return throwNewError(next, 'Debes confirmar la acción para continuar', 401)
    }

    const servicesClient = await Service.find({manager: req.user?.id, client: clientId}).select('_id employees')
    const servicesIds = servicesClient.map(s => s.id)

  
    await Promise.all([
      deleteNotes(client, req.user),
      Service.deleteMany({
        manager: req.user?.id,
        client: clientId
      }),

      Employee.updateMany({
        manager: req.user?.id,
        services: {$in: servicesIds}
      }, {$pull: {services: { $in: servicesIds }}, $set: {available: true}}),

      client.deleteOne()
    ])
    
    return res.status(200).send('Cliente eliminado correctamente')
  }
}