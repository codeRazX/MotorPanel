import { RequestHandler } from "express";
import Service from "../models/Service";
import Employee from "../models/Employees";
import { attachOrCreateClient, deleteNotes, keyDelete, throwNewError } from "../utils";
import Client from "../models/Client";
import envOptions from "../config/envOptions";



export default class ServicesController {

  static getServices : RequestHandler = async (req, res, next) => {
    const page = req.page!
    const filters = req.filters!

    const [services, countDocuments] = await Promise.all([
      Service.find(filters)
      .select('_id vehicle symptoms createdAt updatedAt status')
      .populate('client', 'name slug')
      .sort({createdAt: -1})
      .limit(envOptions.limit_page)
      .skip((page - 1) * envOptions.limit_page)
      .lean(),

      Service.find(filters).countDocuments() 
    ])
    return res.status(200).json({data: services, count: countDocuments, limit: envOptions.limit_page })
  }


  static createService : RequestHandler = async (req, res, next) => {
    
    const {client, symptoms, vehicle} = req.body
    const employees = req.employees
    
    const user = req.user!
    const counter = req.counter!
    
    const service = new Service({symptoms,vehicle, manager: user.id})
    console.log(service.client)
    await attachOrCreateClient(service, client, vehicle, user)

    const incomingEmployeesIds = employees?.map(e => e.id.toString())
    let promisesEmployees;

    if (incomingEmployeesIds?.length) {
      promisesEmployees = Employee.updateMany({
        manager: user.id,
        _id: {$in: incomingEmployeesIds}
      },
      {$addToSet: {services: service.id}, $set: {available: false}}
      )
    }
   
    service.employees = incomingEmployeesIds || []
    counter.totalServices += 1
    service.serviceNumber = counter.totalServices

    await Promise.all([promisesEmployees, counter.save(), service.save()])
    return res.status(201).send('Nuevo servicio registrado con éxito')
  }

  static getServiceById : RequestHandler = (req, res, next) => res.status(200).json(req.service)

  static updateService : RequestHandler = async (req, res, next) => {
    const {employees:_, client, ...data} = req.body
    const service = req.service!
    Object.assign(service, data)
    
    if (data.status === 'completed'){
      service.dateCompleted = new Date()
      service.total = data.repairs.reduce((acc: number, current: {price: number}) => current.price + acc, 0)
    } else if (data.status !== 'completed' && service.dateCompleted){
      service.dateCompleted = null
    } 
   
    await attachOrCreateClient(service, client, data.vehicle, req.user)
    await service.save()
    res.status(201).send('Servicio actualizado con éxito')
  }

  static deleteService: RequestHandler = async (req, res, next) => {
    const service = req.service!
    const {key} = req.query
    const serviceId = service.id
    const clientId = service.client

    if (key !== keyDelete.service) {
      return throwNewError(next, 'Debes confirmar la acción para continuar', 401)
    }

    if (service.employees.length) {
      await Employee.updateMany({
        manager: req.user?.id,
        services: serviceId
      }, {$pull: {services: serviceId}, $set: {available: true}})
    }

     
    await Promise.all([
      deleteNotes(service, req.user),
      Client.updateOne({
        manager: req.user?.id,
        _id: clientId
      }, {$pull: {services: serviceId}}),

      service.deleteOne()
    ])
    
     return res.status(200).send('Servicio eliminado correctamente')
  }

}