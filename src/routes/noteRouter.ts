import { Router } from "express";
import { authenticateWithJWT } from "../middlewares/authentication";
import NoteController from "../controllers/NoteController";
import { validationResultBody } from "../middlewares/validateBody";
import { validateNote } from "../validates";
import { modelNote } from "../middlewares/modelNote";
const router = Router()

router.use(authenticateWithJWT)
router.param('itemId', modelNote)

router.post('/:itemId', 
  validateNote,
  validationResultBody,
  NoteController.createNote
)

router.delete('/:itemId/:noteId', 
  NoteController.deleteNote
)


export default router