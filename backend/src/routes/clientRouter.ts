import {Router} from 'express'
import ClientController from '../controllers/ClientController'
import { authenticateWithJWT } from '../middlewares/authentication'
import { existsClient } from '../middlewares/client'
import {  validateUpdateClient } from '../validates'
import { validationResultBody } from '../middlewares/validateBody'
import { pageSanizate } from '../middlewares/pages'
import Client from '../models/Client'
import { search } from '../middlewares/search'

const router = Router()

router.use(authenticateWithJWT)
router.param('clientId', existsClient)

router.get('/', 
  search,
  pageSanizate(Client),
  ClientController.getClients
)

router.get('/suggested', 
  ClientController.getSuggestedClients
)
router.get('/:clientId',
  ClientController.getClientById
)
router.put('/:clientId',
  validateUpdateClient,
  validationResultBody,
  ClientController.updateClient
)

router.delete('/:clientId',
  ClientController.deleteClient
)

export default router