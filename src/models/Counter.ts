import {Schema, model, Document, Types} from 'mongoose'


export interface CounterType extends Document {
  totalServices: number,
  manager:  Types.ObjectId
}

const CounterSchema : Schema = new Schema({
  totalServices: {
    type: Number,
    default: 0,
  },
  manager: {
    type: Types.ObjectId,
    ref: 'User'
  }
}, {versionKey: false})

const Counter = model<CounterType>('Counter', CounterSchema)
export default Counter