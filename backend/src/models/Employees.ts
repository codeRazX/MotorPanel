import { Schema, model, Document, Types, PopulatedDoc } from "mongoose";
import { ServiceType } from "./Service";
import { UserType } from "./User";
import { NoteType } from "./Note";

const roleEnum = ['mechanic', 'workshop_boss', 'administration', 'body_and_paint', 'dealer', 'trainee', 'assistant', 'sales_representative', 'other'] as const
type roleEnumType = typeof roleEnum[number]

const productivityEnum = ['low', 'medium', 'high'] as const
type productivityEnumType = typeof productivityEnum[number]

export interface EmployeeType extends Document {
  manager: Types.ObjectId | PopulatedDoc<UserType>
  name: string,
  slug: string,
  contact: number,
  services: (Types.ObjectId | PopulatedDoc<ServiceType>)[],
  available: boolean,
  hireDate: Date,
  salary: number,
  role: roleEnumType,
  productivity: productivityEnumType,
  notes: (Types.ObjectId | PopulatedDoc<NoteType>)[]
}

const EmployeeSchema : Schema = new Schema({
  manager: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  contact: {
    type: Number,
    default: null
  },
  services: [
    {
      type: Types.ObjectId,
      ref: 'Service'
    }
  ],
  available: {
    type: Boolean,
    default: true
  },
  hireDate: {
    type: Date,
    default: null
  },
  salary: {
    type: Number,
    default: null
  },
  role: {
    type: String,
    enum: roleEnum,
    required: true,
  },
  productivity: {
    type: String,
    enum: productivityEnum,
    required: true,
  },
  notes: [
    {
      type: Types.ObjectId,
      ref: 'Note'
    }
  ]
}, {versionKey: false, timestamps: true}) 

const Employee = model<EmployeeType>('Employee', EmployeeSchema)
export default Employee