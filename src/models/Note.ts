import {Schema, model, Types, PopulatedDoc, Document} from 'mongoose'
import { UserType } from './User'

export interface NoteType extends Document {
  content: string,
  manager: Types.ObjectId | PopulatedDoc<UserType>
}

const NoteSchema : Schema = new Schema({
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  manager: {
    type: Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, {versionKey: false, timestamps: true})

const Note = model<NoteType>('Note', NoteSchema)
export default Note