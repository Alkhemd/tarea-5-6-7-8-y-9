# ApiNews

Pequeña guía para correr el proyecto localmente (preparado para entregar a la maestra).

Requisitos:
- Node.js (v16+ recomendado)
- MySQL (o MariaDB) corriendo y accesible

Pasos rápidos:
1. Clonar el repo
2. Copiar el ejemplo de variables de entorno:

```powershell
Copy-Item .env.example .env
```

3. Editar `.env` y completar `DB_PASSWORD`, `DB_HOST`, `DB_USER` si es necesario. Opcional: cambiar `INIT_ADMIN_EMAIL` y `INIT_ADMIN_PASSWORD` si deseas otro admin.

4. Instalar dependencias:

```powershell
npm install
```

5. Inicializar la base de datos y crear tablas + usuario admin por defecto (opcional, recomendado):

```powershell
npm run init-db
```

6. Iniciar la aplicación:

```powershell
npm start
```

7. Documentación Swagger:

Visitar `http://localhost:3000/api-docs` después de iniciar la app.

Notas:
- `.env` no debe subirse al repositorio. Usa `.env.example` para compartir variables necesarias.
- Si no quieres crear el admin automáticamente, puedes omitir el paso `npm run init-db` y crear un usuario en la BD manualmente.
