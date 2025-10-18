const { check } = require('express-validator');
const { User } = require('../models/UserModel');


const validatorLogin = [
    check('correo').notEmpty().withMessage('El campo correo es requerido')
        .isEmail().withMessage('El campo correo debe ser un correo válido'),

    check('contraseña').notEmpty().withMessage('El campo contraseña es requerido')
]

const validatorRegister = [
    check('nombre').notEmpty().withMessage('El campo nombre es obligatorio')
        .isString().withMessage('El campo nombre debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo debe tener entre 2 y 100 caracteres'),

    check('apellidos').notEmpty().withMessage('El campo apellidos es obligatorio')
        .isString().withMessage('El campo apellidos debe ser texto')
        .isLength({ min: 2, max: 100 }).withMessage('El campo apellidos debe tener entre 2 y 100 caracteres'),

    check('nick').notEmpty().withMessage('El campo nick es obligatorio')
        .isString().withMessage('El campo nick debe ser texto')
        .isLength({ min: 2, max: 20 }).withMessage('El campo nick debe tener entre 2 y 20 caracteres'),

    check('correo').notEmpty().withMessage('El campo correo es obligatorio')
        .isEmail().withMessage('El campo correo debe ser un correo valido')
        .isLength({ min: 2, max: 255 }).withMessage('El campo correo debe tener entre 2 y 255 caracteres')
        .custom((value, { req }) => {
            return User.findOne({ where: { correo: value } })
                .then((user) => {
                    if (user) {
                        throw new Error('Ya existe un usuario con este correo ')
                    }
                })
        }),

    check('contraseña').notEmpty().withMessage('El campo contraseña es obligatorio')
        .isString().withMessage('El campo contraseña debe ser texto')
        .isLength({ min: 8, max: 255 }).withMessage('El campo contraseña debe tener entre 8 y 255 caracteres'),
    check('perfil_id').optional()
        .isInt().withMessage('El campo perfil_id debe ser un entero')
        .custom((value) => {
            const v = parseInt(value, 10);
            if (v !== 1 && v !== 2) {
                throw new Error('El campo perfil_id solo puede ser 1 o 2');
            }
            return true;
        }),
]

module.exports = {
    validatorLogin,
    validatorRegister
}
