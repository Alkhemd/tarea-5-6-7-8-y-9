const express = require('express');
const app = express();
const PORT = 3000;

// Importar la conexión para probarla
require('./config.db');

app.use(express.json());

// Exportar rutas
const profile_routes = require('./routes/ProfileRoute');

// Usar las rutas
app.use('/api', profile_routes);

// Rutas principales
app.use('/news', require('./routes/news'));
app.use('/states', require('./routes/states'));
app.use('/users', require('./routes/users'));
app.use('/categories', require('./routes/categories'));
app.use('/profiles', require('./routes/profiles'));

// Swagger UI
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log('Servidor escuchando en el puerto ' + PORT);
    console.log('Documentación Swagger disponible en http://localhost:' + PORT + '/api-docs');
});

module.exports = app;