import { RequestHandler } from 'express'
import { validationResult } from 'express-validator'
import { throwNewError } from '../utils'

type validationResultType = {
  path: string,
  msg: string,
}

export const validationResultBody : RequestHandler = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()){
    const errorsValidation = result.array() as validationResultType[]
    const errors = Object.fromEntries(errorsValidation.map(error => [error.path, error.msg] ))
    return throwNewError(next, 'Fallo en la validación', 400, errors)
  }

  return next()

}

