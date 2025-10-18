var express = require('express');

const { login, register, } = require('../controllers/AuthController');
const { validatorLogin, validatorRegister } = require('../validators/AuthValidator');
const api = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - correo
 *         - contraseña
 *       properties:
 *         correo:
 *           type: string
 *         contraseña:
 *           type: string
 *       example:
 *         correo: "usuario@example.com"
 *         contraseña: "password123"
 *     RegisterRequest:
 *       type: object
 *       required:
 *         - nombre
 *         - apellidos
 *         - nick
 *         - correo
 *         - contraseña
 *       properties:
 *         nombre:
 *           type: string
 *         apellidos:
 *           type: string
 *         nick:
 *           type: string
 *         correo:
 *           type: string
 *         contraseña:
 *           type: string
 *         perfil_id:
 *           type: integer
 *           description: Perfil a asignar (1 = admin, 2 = usuario). Requiere X-Admin-Key o token admin.
 *       example:
 *         nombre: "Alumno"
 *         apellidos: "Ejemplo"
 *         nick: "alumno123"
 *         correo: "alumno@example.com"
 *         contraseña: "password123"
 *         perfil_id: 2
 *
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con correo y contraseña
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login exitoso y token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenciales inválidas
 *       422:
 *         description: Error de validación (Unprocessable Entity)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 *
 * /auth/registro:
 *   post:
 *     summary: Registrar un nuevo usuario (crea cuenta)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterRequest'
 *     responses:
 *       201:
 *         description: Usuario creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterRequest'
 *       422:
 *         description: Error de validación (Unprocessable Entity)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: object
 */
api.post('/auth/login', validatorLogin, login);
api.post('/auth/registro/', validatorRegister, register)



module.exports = api;
