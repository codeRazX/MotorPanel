import {Router} from 'express'
const router = Router()
import ServiceController from '../controllers/ServicesController'
import {  validateCreateService, validateUpdateService } from '../validates'
import { validationResultBody } from '../middlewares/validateBody'
import { authenticateWithJWT } from '../middlewares/authentication'
import { existsCounter } from '../middlewares/counter'
import { validateEmployees } from '../middlewares/employees'
import { existsService } from '../middlewares/service'
import { employeesEditService } from '../middlewares/employeesEditService'
import { pageSanizate } from '../middlewares/pages'
import Service from '../models/Service'
import { search } from '../middlewares/search'

router.use(authenticateWithJWT)
router.param('serviceId', existsService)

router.get('/', 
  search,
  pageSanizate(Service),
  ServiceController.getServices
)

router.post('/', 
  validateCreateService,
  validationResultBody,
  validateEmployees,
  existsCounter,
  ServiceController.createService
)

router.get('/:serviceId',
  ServiceController.getServiceById
)
router.put('/:serviceId',
  validateUpdateService,
  validationResultBody,
  validateEmployees,
  employeesEditService,
  ServiceController.updateService
)

router.delete('/:serviceId',
  ServiceController.deleteService
)

export default router