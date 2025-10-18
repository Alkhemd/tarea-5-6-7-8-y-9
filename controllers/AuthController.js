const { User } = require('../models/UserModel');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config.js');

const login = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }

    try {
        const usuario = await User.findOne({
            where: { correo: request.body.correo, activo: true }
        });

        if (!usuario) {
            return response.status(401).json({ message: 'Sin autorización' });
        }

        const match = await bcrypt.compare(request.body.contraseña, usuario.contraseña);
        if (!match) {
            return response.status(401).json({ message: 'Sin autorización' });
        }

        const payload = {
            usuario: {
                id: usuario.id,
                perfil_id: usuario.perfil_id,
                nombre: usuario.nombre,
                apellidos: usuario.apellidos,
                nick: usuario.nick
            }
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        return response.status(201).json({ message: 'Login con éxito', token });

    } catch (err) {
        console.error(err);
        return response.status(500).send('Error al consultar el dato');
    }
};

const register = async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(422).json({ errors: errors.mapped() });
    }

    try {
        // Leer primer el perfil pedido en el body (si existe)
        const requestedPerfilRaw = request.body.perfil_id;
        const requestedPerfilCandidate = parseInt(requestedPerfilRaw, 10);

    // (debug logs removed)

        // Por defecto, nuevo usuario será perfil 2 (normal)
        request.body.activo = true;

        // Usar el perfil_id enviado en el body si es válido (1 o 2), sin requerir token admin
        if (!Number.isNaN(requestedPerfilCandidate) && (requestedPerfilCandidate === 1 || requestedPerfilCandidate === 2)) {
            request.body.perfil_id = requestedPerfilCandidate;
        } else {
            request.body.perfil_id = 2;
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(request.body.contraseña, saltRounds);
        request.body.contraseña = hash;

    // (debug logs removed)

        const newEntitie = await User.create(request.body);

        // (debug logs removed)

        return response.status(201).json(newEntitie);
    } catch (err) {
        console.error(err);
        return response.status(500).send('Error al crear');
    }
};

module.exports = { login, register };
