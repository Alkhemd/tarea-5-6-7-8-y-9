const express = require('express');
const router = express.Router();
const { Profile } = require('../models/ProfileModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     Profile:
 *       type: object
 *       required:
 *         - nombre
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /profiles:
 *   get:
 *     summary: Obtener todos los perfiles
 *     tags: [Profiles]
 *     responses:
 *       200:
 *         description: Lista de perfiles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profile'
 */
router.get('/', async (req, res) => {
  const profiles = await Profile.findAll();
  res.json(profiles);
});

/**
 * @swagger
 * /profiles/{id}:
 *   get:
 *     summary: Obtener un perfil por ID
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil
 *     responses:
 *       200:
 *         description: Perfil encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Perfil no encontrado
 */
router.get('/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);
  if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });
  res.json(profile);
});

/**
 * @swagger
 * /profiles:
 *   post:
 *     summary: Crear un perfil
 *     tags: [Profiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       201:
 *         description: Perfil creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 */
router.post('/', async (req, res) => {
  try {
    const profile = await Profile.create(req.body);
    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /profiles/{id}:
 *   put:
 *     summary: Actualizar un perfil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Profile'
 *     responses:
 *       200:
 *         description: Perfil actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profile'
 *       404:
 *         description: Perfil no encontrado
 */
router.put('/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);
  if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });
  await profile.update(req.body);
  res.json(profile);
});

/**
 * @swagger
 * /profiles/{id}:
 *   delete:
 *     summary: Eliminar un perfil
 *     tags: [Profiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del perfil
 *     responses:
 *       204:
 *         description: Perfil eliminado
 *       404:
 *         description: Perfil no encontrado
 */
router.delete('/:id', async (req, res) => {
  const profile = await Profile.findByPk(req.params.id);
  if (!profile) return res.status(404).json({ error: 'Perfil no encontrado' });
  await profile.destroy();
  res.status(204).send();
});

module.exports = router;
