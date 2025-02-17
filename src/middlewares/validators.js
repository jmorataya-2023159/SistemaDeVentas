import { body } from "express-validator"
import { validateErrors } from "../middlewares/validate.errors.js"
import { existUsername } from '../../utils/db.validators.js'

export const registerValidator=[
    body('name','Name cannot be empty')
    .notEmpty(),
    body('surname', 'Surname cannot be empty')
    .notEmpty(),
    body('email', 'Email cannot be empty')
    .notEmpty()
    .isEmail(),
    body('username')
    .custom(existUsername)
    .notEmpty()
    .toLowerCase(),
    body('username', 'Username cannot be empty')
    .notEmpty()
    .toLowerCase(),
    body('password', 'Password cannot be empty')
    .notEmpty()
    .isStrongPassword()
    .withMessage('Password must be strong')
    .isLength({min:8})
    .withMessage('Password need min characters'),
    body('phone', 'Phone cannot be empty')
    .notEmpty()
    .isMobilePhone()
    ,
    validateErrors
]

export const loginValidator = [
    body('name', 'Name cannot be empty')
    .notEmpty()
    .toLowerCase,
    body('password', 'Password cannot be empty')
    .notEmpty()
    .isStrongPassword()
    .withMessage('the password connot be empty')
    .isLength({min: 8}),
    validateErrors
]

// export const actualizarUser=[]