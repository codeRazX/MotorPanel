import { body } from "express-validator";
import Client from "../models/Client";

export const validateNameAndEmail = [
  body('name')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({max: 100}).withMessage('Máximo 100 caracteres permitidos'),

  body('email')
    .isEmail().toLowerCase().withMessage('Introduce un correo electrónico válido').bail()
]

export const validatePasswordAndConfirmPassword = [
   body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .isLength({min: 8}).withMessage('La contraseña debe tener mínimo 8 caracteres').bail()
    .isLength({max: 64}).withMessage('La contraseña debe tener máximo 64 caracteres').bail()
    .matches(/[A-Z]/).withMessage('La contraseña debe incluir mínimo una letra en mayúscula'),

  body('confirm_password')
    .notEmpty().withMessage('Las contraseñas deben coincidir').bail()
    .custom((value, {req}) => {
      if (value !== req.body.password ){
        throw new Error('Las contraseñas deben coincidir')
      }

      return true
    })
]

export const validateAccount = [
  ...validateNameAndEmail,
  ...validatePasswordAndConfirmPassword
]

export const validateProfilePassword = [
  ...validatePasswordAndConfirmPassword,
  body('current_password')
  .notEmpty().withMessage('La contraseña actual es obligatoria')
]

export const validateLogin = [
  body('email').isEmail().toLowerCase().withMessage('Introduce un correo electrónico válido').bail(),
  body('password').notEmpty().withMessage('La contraseña es obligatoria')
]


export const validateCreateService = [
  body('client')
  .trim().toLowerCase()
  .notEmpty().withMessage('El nombre del cliente es obligatorio').bail()
  .isLength({max: 100}).withMessage('Máximo 100 caracteres permitidos'),

  body('vehicle')
  .trim().toLowerCase()
  .notEmpty().withMessage('El vehículo es obligatorio').bail()
  .isLength({max: 100}).withMessage('Máximo 100 caracteres permitidos'),

  body('symptoms')
  .notEmpty().withMessage('Por favor, informa las observaciones al recepcionar el vehículo').bail()
  .isLength({max: 500}).withMessage('Máximo 500 caracteres permitidos')
]

export const validateUpdateService = [
  ...validateCreateService,
  body('status')
    .notEmpty().withMessage('Debes seleccionar el progreso de tu servicio')
    .custom(value => {
      if (!['pending', 'in progress', 'completed'].includes(value)){
        throw new Error('Selecciona un progreso válido')
      }
      return true
  }),

  body('vat')
    .optional()
    .custom((value, {req}) => {
      if (req.body.status === 'completed'){
        if (!value) throw new Error('Debes seleccionar el tipo de IVA a aplicar')
      }
      if (!["22", "21", "20", "19", "18", "17", "16"].includes(String(value))){
        throw new Error('Selecciona un tipo de IVA válido')
      }
      return true
    }).bail()
    .customSanitizer((value, {req}) => {
      if ( req.body.status !== 'completed'){
        return 21
      }
      return value
    })
    .toInt(),

    body('repairs') 
      .optional()
      .isArray().withMessage('Hubo un error al validar, por favor revisa los datos enviados').bail()
      .customSanitizer((value, {req}) => {
        if (req.body.status !== 'completed'){
          return []
        }
        return value
      })
      .custom((value, {req}) => {
        if (!value.length && req.body.status !== 'completed') return true
        if (!value.length) {
          throw new Error('Debes añadir al menos una reparación');
        }
        return true
      }).bail(),

      body('repairs.*.description')
        .if(body('status').equals('completed'))
        .notEmpty().withMessage('La descripción es obligatoria').bail()
        .isLength({max: 100}).withMessage('Máximo 100 caracteres permitidos para la descripción'),

      body('repairs.*.quantity')
        .if(body('status').equals('completed'))
        .toInt()
        .isInt({ gt: 0 }).withMessage('La cantidad debe ser un número mayor que 0'),

       body('repairs.*.price')
        .if(body('status').equals('completed'))
        .toFloat()
        .isFloat({ gt: 0 }).withMessage('El precio debe ser mayor que 0'),

      body('repairs.*.type')
      .if(body('status').equals('completed'))
      .isIn(['unit', 'hour']).withMessage('El tipo debe ser válido'),
    
]


export const validateCreateEmployee = [
  body('name')
  .trim().toLowerCase()
  .notEmpty().withMessage('El nombre del empleado es obligatorio').bail()
  .isLength({max: 100}).withMessage('Máximo 100 caracteres permitidos'),

  body('contact')
   .custom(value => {
    if ( value === null || value === undefined) return true;
    if (!/^\d{6,15}$/.test(value)) {
      throw new Error('Debe tener entre 6 y 15 dígitos y solo números sin espacios');
    }
    return true;
  }),

  body('hireDate')
  .customSanitizer(value => value ? value : null)
  .custom(value => {
    if (!value) return true
    const date = new Date(value);
    const today = new Date();

    if (isNaN(date.getTime())) throw new Error("Introduce una fecha válida");
    if (date > today) throw new Error("La fecha no puede ser futura");

    return true;
  }),

  body('salary')
  .custom(value => {
    if (value === null || value === undefined) return true;
    if (!/^\d{3,15}$/.test(value)) {
      throw new Error('Debe tener entre 3 y 15 dígitos y solo números sin espacios');
    }
    return true;
  }),

  body('role')
  .notEmpty().withMessage('Debes seleccionar un cargo').bail()
  .custom(value => {
    if(!['mechanic', 'workshop_boss', 'administration', 'body_and_paint', 'dealer', 'trainee', 'assistant', 'sales_representative', 'other'].includes(value)){
       throw new Error('Seleccione un cargo válido')
    }

    return true
  }),

  body('productivity')
  .notEmpty().withMessage('Seleccione una productividad').bail()
  .custom(value => {
    if(!['low', 'medium', 'high'].includes(value)){
       throw new Error('Seleccione una productividad válida')
    }

    return true
  })

]

export const validateUpdateEmployee = [
  ...validateCreateEmployee,
  body('available')
    .notEmpty().withMessage('Debes seleccionar si el empleado está disponible').bail()
    .isBoolean().withMessage('Seleccione una opción válida')
];

export const validateUpdateClient = [
  body('name')
    .trim().toLowerCase()
    .notEmpty().withMessage('El nombre del cliente es obligatorio mandamiento').bail()
    .isLength({max: 100}).withMessage('Máximo 100 caracteres permitidos'),

  body('contact')
    .custom(value => {
      if ( value === null || value === undefined) return true;
      if (!/^\d{6,15}$/.test(value)) {
        throw new Error('Debe tener entre 6 y 15 dígitos y solo números sin espacios');
      }
      return true;
    }),

  body('vehicles')
    .optional()
    .isLength({max:100}).withMessage('Máximo 100 caracteres permitidos'),

  body('vehicles_remove')
    .optional()
    .isArray().withMessage('Hubo un error al procesar los vehículos, revise los datos')
    .custom(async (value, {req}) => {
      const client = await Client.findOne({
        manager: req.user?.id,
        name: req.body.name
      })
      
      const hasInvalid = value.some((v: string) => !client?.vehicles.includes(v))
      if (hasInvalid){
        throw new Error('Un vehículo no está asociado al cliente, revise los datos')
      }
      return true
    }),

  body('regularCustomer')
    .notEmpty().withMessage('Debes seleccionar si el cliente es habitual').bail()
    .isBoolean().withMessage('Seleccione una opción válida')
]


export const validateNote = [
  body('notes')
    .trim()
    .notEmpty().withMessage('El campo no puede ir vacío').bail()
    .isLength({max: 100}).withMessage('Máximo 100 caracteres permitidos'),
]

