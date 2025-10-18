require('dotenv').config();

const PORT = process.env.PORT || 3000;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'db_news_api';
const DB_PORT = process.env.DB_PORT || 3306;

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_jwt_api_news_2024';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

module.exports = { PORT, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT, JWT_SECRET, JWT_EXPIRES_IN };