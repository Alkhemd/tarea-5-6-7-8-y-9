const express = require('express');
const router = express.Router();
const { New } = require('../models/NewModel');

/**
 * @swagger
 * components:
 *   schemas:
 *     News:
 *       type: object
 *       required:
 *         - categoria_id
 *         - estado_id
 *         - usuario_id
 *         - titulo
 *         - fecha_publicacion
 *         - descripcion
 *         - imagen
 *       properties:
 *         id:
 *           type: integer
 *         categoria_id:
 *           type: integer
 *         estado_id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         titulo:
 *           type: string
 *         fecha_publicacion:
 *           type: string
 *           format: date-time
 *         descripcion:
 *           type: string
 *         imagen:
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
 * /news:
 *   get:
 *     summary: Obtener todas las noticias
 *     tags: [News]
 *     responses:
 *       200:
 *         description: Lista de noticias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/News'
 */
router.get('/', async (req, res) => {
  const news = await New.findAll();
  res.json(news);
});

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Obtener una noticia por ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la noticia
 *     responses:
 *       200:
 *         description: Noticia encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: Noticia no encontrada
 */
router.get('/:id', async (req, res) => {
  const news = await New.findByPk(req.params.id);
  if (!news) return res.status(404).json({ error: 'Noticia no encontrada' });
  res.json(news);
});

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Crear una noticia
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       201:
 *         description: Noticia creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 */
router.post('/', async (req, res) => {
  try {
    const news = await New.create(req.body);
    res.status(201).json(news);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Actualizar una noticia
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la noticia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/News'
 *     responses:
 *       200:
 *         description: Noticia actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/News'
 *       404:
 *         description: Noticia no encontrada
 */
router.put('/:id', async (req, res) => {
  const news = await New.findByPk(req.params.id);
  if (!news) return res.status(404).json({ error: 'Noticia no encontrada' });
  await news.update(req.body);
  res.json(news);
});

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Eliminar una noticia
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la noticia
 *     responses:
 *       204:
 *         description: Noticia eliminada
 *       404:
 *         description: Noticia no encontrada
 */
router.delete('/:id', async (req, res) => {
  const news = await New.findByPk(req.params.id);
  if (!news) return res.status(404).json({ error: 'Noticia no encontrada' });
  await news.destroy();
  res.status(204).send();
});

module.exports = router;
