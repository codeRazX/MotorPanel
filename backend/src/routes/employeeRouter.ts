import {Router} from 'express'
import { authenticateWithJWT } from '../middlewares/authentication'
import EmployeController from '../controllers/EmployeController'
import {  validateCreateEmployee, validateUpdateEmployee } from '../validates'
import { validationResultBody } from '../middlewares/validateBody'
import { existsEmployee } from '../middlewares/employee'
import { pageSanizate } from '../middlewares/pages'
import Employee from '../models/Employees'
import { search } from '../middlewares/search'

const router = Router()
router.use(authenticateWithJWT)
router.param('employeeId', existsEmployee)

router.get('/', 
  search,
  pageSanizate(Employee),
  EmployeController.getEmployees
)

router.get('/available',
  EmployeController.getEmployeesAvailable
)

router.post('/', 
  validateCreateEmployee,
  validationResultBody,
  EmployeController.createEmployee
)

router.get('/:employeeId', 
  EmployeController.getEmployeeById
)

router.put('/:employeeId', 
  validateUpdateEmployee,
  validationResultBody,
  EmployeController.updatedEmployee
)

router.delete('/:employeeId', 
  EmployeController.deleteEmployee
)



export default router