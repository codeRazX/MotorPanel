import { ErrorRequestHandler } from "express"
import mongoose from "mongoose"


export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let status = error.status ?? 500
  let message = error.message ?? 'Ups, hubo un error inesperado, intente de nuevo'
  const errors = error.errors ?? null

  if (error instanceof mongoose.Error.CastError) {
    message = 'Ocurrió un error inesperado. El elemento es inválido o no existe'
    status = 404
  } else if (error instanceof mongoose.Error.ValidationError) {
    message = 'Error en la validación'
    status = 400
  } else if (error instanceof mongoose.Error || error instanceof TypeError) {
    message = 'Ocurrió un error inesperado'
    status = 500
  }
 
  if (!res.headersSent){
    return res.status(status).json({message, errors})
  }
}