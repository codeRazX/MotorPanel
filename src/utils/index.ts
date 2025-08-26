import { NextFunction } from "express"
import { UserType } from "../models/User"
import bcrypt from 'bcrypt'
import Client, { ClientType } from "../models/Client"
import { ServiceType } from "../models/Service"
import { EmployeeType } from "../models/Employees"
import Note from "../models/Note"

type ErrorType = Error & {
  message: string,
  status: number,
  errors: Record<string, string> | null
}

export const throwNewError = (next : NextFunction, message: ErrorType['message'], status: ErrorType['status'], errors: ErrorType['errors'] = null) => {
  const error = new Error(message) as ErrorType
  error.status = status
  error.errors = errors
  next(error)
}

export const hashPassword = (rawPassword: UserType['password']) => bcrypt.hash(rawPassword, Number(process.env.SALT))

export const comparePassword = (rawPassword: UserType['password'], storePassword: UserType['password']) => bcrypt.compare(rawPassword, storePassword)

export const normalizeString = (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()

export const capitalizeName = (name: string) => name.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ')


export const attachOrCreateClient = async ( service: ServiceType, clientName: string, vehicle: string, user?: UserType) =>{

  const existing = await Client.findOne({ name: normalizeString(clientName), manager: user?.id })
  const previousClientId = service.client || null

  if (!existing) {
    let removeExistingService
    
    if (previousClientId) {
      removeExistingService= Client.updateOne(
        { _id: previousClientId, manager: user?.id },
        { $pull: { services: service.id } }
      )
    }
    const [newClient] = await Promise.all([
      Client.create({
        name: normalizeString(clientName),
        slug: capitalizeName(clientName),
        manager: user?.id,
        services: [service.id],
        vehicles: [vehicle]
      }),
      removeExistingService
    ])
    service.client = newClient.id
  } else {
    const shouldRemoveFromPrevious = previousClientId && previousClientId.id.toString() !== existing.id.toString()
    let removeExistingService;
   
    if (shouldRemoveFromPrevious) {
      removeExistingService = Client.updateOne(
        { _id: previousClientId, manager: user?.id },
        {
          $pull: { services: service.id },
        }
      )
    }

    service.client = existing.id;  
    const addNewService = Client.updateOne(
      { _id: existing.id, manager: user?.id },
      {
        $addToSet: {services: service.id, vehicles: vehicle}
      }
    );
    await Promise.all([removeExistingService, addNewService])
  }
}

export const deleteNotes = async (model: ServiceType | EmployeeType | ClientType, user?: UserType ) => {
  if (model.notes.length) {
    const notesIds = model.notes.map(n => n?.id)
    await Note.deleteMany({
      manager: user?.id,
      _id: {$in: notesIds}
    })
  }
}

export const keyDelete = {
  employee: 'Eliminar/empleado',
  client: 'Eliminar/cliente',
  service: 'Eliminar/servicio',
} as const


export const reverseTranslationRole = {
  'mecanico': 'mechanic',
  'jefe de taller': 'workshop_boss',
  'chapa y pintura': 'body_and_paint',
  'aprendiz': 'trainee',
  'repartidor': 'dealer',
  'comercial': 'sales_representative',
  'administracion': 'administration',
  'asistente': 'assistant',
  'otro': 'other'
} as const

export const reverseTranslationProductivity = {
  'baja': 'low',
  'media': 'medium',
  'alta': 'high'
} as const

export const reverseTranslationStatus = {
  'pendiente': 'pending',
  'en progreso': 'in progress',
  'completado': 'completed'
} as const

Object.freeze(keyDelete)
Object.freeze(reverseTranslationRole)
Object.freeze(reverseTranslationProductivity)
Object.freeze(reverseTranslationStatus)
