import { Schema, model, Document, Types, PopulatedDoc } from "mongoose";
import { EmployeeType } from "./Employees";
import { ClientType } from "./Client";
import { UserType } from "./User";
import { NoteType } from "./Note";


const serviceStatus = {
  pending: 'pending',
  inProgress: 'in progress',
  completed: 'completed'
} as const

const serviceVat = {
  "22": 22,
  "21": 21,
  "20": 20,
  "19": 19,
  "18": 18,
  "17": 17,
  "16": 16,
} as const

type serviceStatusType = typeof serviceStatus[keyof typeof serviceStatus]
type serviceVatType = typeof serviceVat[keyof typeof serviceVat]

export interface ServiceType extends Document {
  serviceNumber: number,
  manager: Types.ObjectId | PopulatedDoc<UserType>,
  client: Types.ObjectId | PopulatedDoc<ClientType>,
  vehicle: string,
  symptoms: string,
  total: number,
  vat: serviceVatType,
  repairs: string[],
  status: serviceStatusType
  employees: (Types.ObjectId | PopulatedDoc<EmployeeType>)[],
  dateCompleted: Date | null,
  notes: (Types.ObjectId | PopulatedDoc<NoteType>)[]
}

const ServiceSchema : Schema = new Schema({
  serviceNumber: {
    type: Number,
    required: true
  },
  
  manager: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  client: {
    type: Types.ObjectId,
    required: true,
    ref: 'Client'
  },

  vehicle: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },

  symptoms: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },

  total: {
    type: Number,
    default: null,
  },
  vat: {
    type: Number,
    default: serviceVat[21]
  },
  repairs: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true },
      type: { type: String, enum: ['unit', 'hour'], required: true },
      price: { type: Number, required: true }
    }
  ],

  status: {
    type: String,
    enum: Object.values(serviceStatus),
    default: serviceStatus.pending
  },

  employees: [
    {
      type: Types.ObjectId,
      ref: 'Employee'
    }
  ],
  dateCompleted: {
    type: Date || null,
    default: null
  }, 
  notes: [
    {
      type: Types.ObjectId,
      ref: 'Note'
    }
  ]
}, {versionKey: false, timestamps: true})

const Service = model<ServiceType>('Service', ServiceSchema)
export default Service