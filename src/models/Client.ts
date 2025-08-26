import {Schema, model, Types, PopulatedDoc, Document} from 'mongoose'
import { ServiceType } from './Service'
import { UserType } from './User'
import { NoteType } from './Note'

export interface ClientType extends Document {
  name: string,
  slug: string,
  manager: Types.ObjectId | PopulatedDoc<UserType>
  contact: number,
  vehicles: string[],
  services: (Types.ObjectId | PopulatedDoc<ServiceType>)[],
  regularCustomer: boolean,
  notes: (Types.ObjectId | PopulatedDoc<NoteType>)[]
}

const ClientSchema : Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  
  slug: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },

  manager: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },

  contact: {
    type: Number,
    min: 100,
    default: null
  },

  vehicles: [
    {
      type: String,
      maxlength: 100,
      trim: true
    }
  ],

  services: [
    {
      type: Types.ObjectId,
      ref: 'Service',
      required: true,
    }
  ],

  regularCustomer: {
    type: Boolean,
    default: false
  },

  notes: [
    {
      type: Types.ObjectId,
      ref: 'Note'
    }
  ]
}, {versionKey: false, timestamps: true})

const Client = model<ClientType>('Client', ClientSchema)
export default Client