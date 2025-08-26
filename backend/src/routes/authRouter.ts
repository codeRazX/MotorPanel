import {Router} from 'express'
import AuthController from '../controllers/AuthController'
import { validateAccount, validateLogin, validateNameAndEmail, validateProfilePassword } from '../validates'
import { validationResultBody } from '../middlewares/validateBody'
import { authenticateWithJWT } from '../middlewares/authentication'

const router = Router()

router.post('/account', 
  validateAccount,
  validationResultBody,
  AuthController.createAccount
)
router.post('/login', 
  validateLogin,
  validationResultBody,
  AuthController.login
)
router.get('/user',
  authenticateWithJWT,
  AuthController.userAuthentication
)

router.post('/logout', 
  authenticateWithJWT,
  AuthController.logout
)

router.put('/profile', 
  authenticateWithJWT,
  validateNameAndEmail,
  validationResultBody,
  AuthController.updateProfile
)

router.put('/profile/password', 
  authenticateWithJWT,
  validateProfilePassword,
  validationResultBody,
  AuthController.updateProfilePassword
)

export default router