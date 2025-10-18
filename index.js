// index.js ahora actúa como servidor: importa app y levanta el listener
const { PORT } = require('./config');
const app = require('./app');

// Importar la conexión para probarla
require('./config.db');

// Swagger UI (se monta desde aquí porque index.js hace listen)
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
    console.log('Documentación Swagger disponible en http://localhost:' + PORT + '/api-docs');
});

module.exports = app;