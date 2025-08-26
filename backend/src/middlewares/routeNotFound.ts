import { RequestHandler } from "express";
import { throwNewError } from "../utils";

export const routeNotFound : RequestHandler = (req, res, next) => {
  return throwNewError(next, 'Ruta no encontrada', 404)
}