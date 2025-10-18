const request = require('supertest');
const app = require('../index');

describe('Auth endpoints', () => {
  it('should register a new user and login', async () => {
    const random = Math.floor(Math.random() * 100000);
    const userPayload = {
      nombre: 'Test',
      apellidos: 'User',
      nick: 'test' + random,
      correo: `test${random}@example.com`,
      contraseña: 'password123'
    };

    // Register
    const reg = await request(app).post('/api/auth/registro/').send(userPayload);
    expect([201, 200]).toContain(reg.status);

    // Login
    const login = await request(app).post('/api/auth/login').send({ correo: userPayload.correo, contraseña: userPayload.contraseña });
    expect([200,201]).toContain(login.status);
    expect(login.body).toHaveProperty('token');
  });

  it('should fail login with wrong credentials', async () => {
    const resp = await request(app).post('/api/auth/login').send({ correo: 'noexiste@example.com', contraseña: 'wrongpass' });
    expect([401, 422]).toContain(resp.status);
  });
});
