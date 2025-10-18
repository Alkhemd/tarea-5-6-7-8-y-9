const { connection } = require('../config.db');
const { User } = require('../models/UserModel');
const bcrypt = require('bcrypt');

async function init() {
  try {
    console.log('Sincronizando modelos con la base de datos...');
    await connection.sync({ alter: true });
    console.log('Sincronización completa.');

    // Crear admin por defecto si no existe
    const adminEmail = process.env.INIT_ADMIN_EMAIL || 'admin@example.com';
    const adminPass = process.env.INIT_ADMIN_PASSWORD || 'Admin1234';

    const existing = await User.findOne({ where: { correo: adminEmail } });
    if (!existing) {
      const hash = await bcrypt.hash(adminPass, 10);
      const admin = await User.create({
        nombre: 'Admin',
        apellidos: 'Default',
        nick: 'admin',
        correo: adminEmail,
        contraseña: hash,
        perfil_id: 1,
        activo: true
      });
      console.log('Usuario admin creado:', admin.correo);
    } else {
      console.log('Usuario admin ya existe:', adminEmail);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error al inicializar la BD:', err);
    process.exit(1);
  }
}

init();
