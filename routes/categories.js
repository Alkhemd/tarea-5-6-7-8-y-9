const express = require('express');
const router = express.Router();
const { Category } = require('../models/CategoryModel');
const { validatorCategoryCreate, validatorCategoryUpdate } = require('../validators/CategoryValidator');

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - nombre
 *         - descripcion
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         descripcion:
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
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Lista de categorías
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get('/', async (req, res) => {
	const categories = await Category.findAll();
	res.json(categories);
});

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 */
router.get('/:id', async (req, res) => {
	const category = await Category.findByPk(req.params.id);
	if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
	res.json(category);
});

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una categoría
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         description: Categoría creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.post('/', validatorCategoryCreate, async (req, res) => {
	try {
		const category = await Category.create(req.body);
		res.status(201).json(category);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Actualizar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Categoría actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Categoría no encontrada
 */
router.put('/:id', validatorCategoryUpdate, async (req, res) => {
	const category = await Category.findByPk(req.params.id);
	if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
	await category.update(req.body);
	res.json(category);
});

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       204:
 *         description: Categoría eliminada
 *       404:
 *         description: Categoría no encontrada
 */
router.delete('/:id', async (req, res) => {
	const category = await Category.findByPk(req.params.id);
	if (!category) return res.status(404).json({ error: 'Categoría no encontrada' });
	await category.destroy();
	res.status(204).send();
});

module.exports = router;
