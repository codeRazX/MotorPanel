import { RequestHandler } from "express";
import Note from "../models/Note";
import { throwNewError } from "../utils";

export default class NoteController {
  
  static createNote : RequestHandler = async (req, res, next) => {
    const {notes} = req.body
    const model = req.modelNote!

    const note = await Note.create({
      manager: req.user?.id,
      content: notes
    })

    model.notes.push(note.id)
    await model.save()

    res.status(201).send('Nota registrada con éxito')
  }

  static deleteNote : RequestHandler = async (req, res, next) => {
    const model = req.modelNote!
    const {noteId} = req.params

    const note = await Note.findOne({
      manager: req.user?.id,
      _id: noteId
    })

    if (!note) {
      return throwNewError(next, 'Hubo un error al completar la acción', 404)
    }

    model.notes = model.notes.filter(note => note?.toString() !== noteId)
    await Promise.all([model.save(), note.deleteOne()])
    res.status(200).send('Nota eliminada correctamente')
  }
}