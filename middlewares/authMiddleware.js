const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

/**
 * Middleware para verificar el token JWT
 */
const authenticateToken = (req, res, next) => {
    // Obtener el token del header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ 
            error: 'Token no proporcionado',
            message: 'Se requiere autenticación para acceder a este recurso'
        });
    }

    // Verificar el token
    jwt.verify(token, JWT_SECRET, (error, user) => {
        if (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    error: 'Token expirado',
                    message: 'El token ha expirado, por favor inicia sesión nuevamente'
                });
            }
            if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    error: 'Token inválido',
                    message: 'El token proporcionado no es válido'
                });
            }
            return res.status(401).json({ 
                error: 'Error de autenticación',
                message: error.message
            });
        }

        // Adjuntar la información del usuario al request
        req.user = user;
        next();
    });
};

/**
 * Middleware para verificar roles específicos
 * @param  {...any} allowedRoles - Roles permitidos (por perfil_id)
 */
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                error: 'No autenticado',
                message: 'Debe estar autenticado para acceder a este recurso'
            });
        }

        if (!allowedRoles.includes(req.user.perfil_id)) {
            return res.status(403).json({ 
                error: 'Acceso denegado',
                message: 'No tienes permisos para realizar esta acción'
            });
        }

        next();
    };
};

module.exports = {
    authenticateToken,
    authorizeRoles
};
