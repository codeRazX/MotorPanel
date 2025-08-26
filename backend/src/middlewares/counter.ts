import { RequestHandler } from "express";
import Counter from "../models/Counter";


export const existsCounter : RequestHandler = async (req, res, next) => {
  try{
    const user = req.user!
    const existsCounter = await Counter.findOne({manager: user.id})
  
    if (existsCounter){
      req.counter = existsCounter
      return next()
    }
    const counter = await Counter.create({manager: user.id})
    req.counter = counter
    next()
  }
  catch(error){
    next(error)
  }
}