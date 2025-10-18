const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ApiNews',
    version: '1.0.0',
    description: 'Documentación de la API de noticias con Sequelize y Express - Autenticación JWT',
  },
    servers: [
    {
      // Poner la base de la API en /api para que Swagger ejecute rutas como /api/usuarios
      url: 'http://localhost:3000/api',
      description: 'Servidor local (base /api)',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Escanear solo archivos de rutas actuales que terminen en 'Route.js'
  apis: ['./routes/*Route.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
