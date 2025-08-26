import {Schema, model, Document} from 'mongoose'

export interface UserType extends Document {
  name: string,
  email: string,
  password: string
}

const userSchema : Schema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 64
  },

  name: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true,
  },

}, {versionKey: false, timestamps: true})

const User = model<UserType>('User', userSchema)
export default User
