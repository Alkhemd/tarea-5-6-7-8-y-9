const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config.js');


const authenticateAdmin = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            // token inválido o expirado
            return res.status(401).send({ message: 'Token inválido o expirado' });
        }

        // adjuntar usuario decodificado para uso posterior
        req.user = decoded?.usuario;

        if (req.user?.perfil_id === 1) {
            return next();
        }

        return res.status(403).send({ message: 'Sin autorización' });
    });
}

const authenticateAny = (req, res, next) => {
    const authorization_header = req.headers.authorization;
    const token = authorization_header?.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: 'No se proporcionó un token' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Token inválido o expirado' });
        }

        // adjuntar usuario decodificado para uso posterior
        req.user = decoded?.usuario;
        return next();
    });
}


module.exports = {
    authenticateAdmin,
    authenticateAny
};
