import { RequestHandler } from 'express'
import {Model} from 'mongoose'
import envOptions from '../config/envOptions'


export const pageSanizate = <T>(model: Model<T>) : RequestHandler => async (req, res, next) =>  {
  const filters = req.filters!
  let page = Number(req.query.page) || 1
  const countDocuments = await model.find(filters).countDocuments()

  if (page !== 1) {
    const totalPages = Math.ceil(countDocuments / envOptions.limit_page)
    if (page < 1 || page > totalPages) page = 1
  }

  req.page = page
  next()
}