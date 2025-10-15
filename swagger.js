const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'ApiNews',
    version: '1.0.0',
    description: 'Documentación de la API de noticias con Sequelize y Express',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Aquí se documentarán los endpoints
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
