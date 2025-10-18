const express = require('express');
const { authenticateAny } = require('../middlewares/jwt');

const api = express.Router();

api.get('/me', authenticateAny, (req, res) => {
  // El middleware ya adjunta el usuario decodificado en req.user
  return res.json({ payload: { usuario: req.user } });
});

module.exports = api;
