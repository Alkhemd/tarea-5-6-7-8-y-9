const express = require('express');
const router = express.Router();
const { State } = require('../models/StateModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     State:
 *       type: object
 *       required:
 *         - nombre
 *         - abreviacion
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         abreviacion:
 *           type: string
 *         activo:
 *           type: boolean
 *         UserAlta:
 *           type: string
 *         FechaAlta:
 *           type: string
 *           format: date-time
 *         UserMod:
 *           type: string
 *         FechaMod:
 *           type: string
 *           format: date-time
 *         UserBaja:
 *           type: string
 *         FechaBaja:
 *           type: string
 *           format: date-time
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /states:
 *   get:
 *     summary: Obtener todos los estados
 *     tags: [States]
 *     responses:
 *       200:
 *         description: Lista de estados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/State'
 */
router.get('/', async (req, res) => {
  const states = await State.findAll();
  res.json(states);
});

/**
 * @swagger
 * /states/{id}:
 *   get:
 *     summary: Obtener un estado por ID
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estado
 *     responses:
 *       200:
 *         description: Estado encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       404:
 *         description: Estado no encontrado
 */
router.get('/:id', async (req, res) => {
  const state = await State.findByPk(req.params.id);
  if (!state) return res.status(404).json({ error: 'Estado no encontrado' });
  res.json(state);
});

/**
 * @swagger
 * /states:
 *   post:
 *     summary: Crear un estado
 *     tags: [States]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       201:
 *         description: Estado creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 */
router.post('/', async (req, res) => {
  try {
    const state = await State.create(req.body);
    res.status(201).json(state);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /states/{id}:
 *   put:
 *     summary: Actualizar un estado
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/State'
 *     responses:
 *       200:
 *         description: Estado actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/State'
 *       404:
 *         description: Estado no encontrado
 */
router.put('/:id', async (req, res) => {
  const state = await State.findByPk(req.params.id);
  if (!state) return res.status(404).json({ error: 'Estado no encontrado' });
  await state.update(req.body);
  res.json(state);
});

/**
 * @swagger
 * /states/{id}:
 *   delete:
 *     summary: Eliminar un estado
 *     tags: [States]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del estado
 *     responses:
 *       204:
 *         description: Estado eliminado
 *       404:
 *         description: Estado no encontrado
 */
router.delete('/:id', async (req, res) => {
  const state = await State.findByPk(req.params.id);
  if (!state) return res.status(404).json({ error: 'Estado no encontrado' });
  await state.destroy();
  res.status(204).send();
});

module.exports = router;
