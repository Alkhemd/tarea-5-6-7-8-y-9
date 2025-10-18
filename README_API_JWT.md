API de Noticias con Autenticación JWT - Guía de Uso

Tabla de Contenidos

1. Configuración
2. Endpoints de Autenticación
3. Uso del Token JWT
4. Endpoints Protegidos
5. Niveles de Acceso
6. Ejemplos de Uso

---

1. Configuración

Variables de Entorno

El proyecto utiliza las siguientes variables de entorno (puedes configurarlas en un archivo .env):

```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_news_api
DB_PORT=3306
JWT_SECRET=clave_secreta_jwt_api_news_2024
JWT_EXPIRES_IN=24h
```

Instalación de Dependencias

```bash
npm install
npm install jsonwebtoken
```

Iniciar el Servidor

```bash
npm start
```

El servidor estará disponible en: http://localhost:3000

---

2. Endpoints de Autenticación

2.1 Registro de Usuario

POST /api/auth/registro

Crea una nueva cuenta de usuario. El usuario se registra automáticamente con perfil_id = 2 (Usuario Regular).

Body (JSON):
```json
{
  "nombre": "Juan",
  "apellidos": "Pérez García",
  "nick": "juanp",
  "correo": "juan@ejemplo.com",
  "contraseña": "password123"
}
```

Respuesta exitosa (201):
```json
{
  "message": "Registro exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "correo": "juan@ejemplo.com",
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "nick": "juanp",
    "perfil_id": 2
  }
}
```

---

2.2 Login (Iniciar Sesión)

POST /api/auth/login

Autentica un usuario existente y devuelve un token JWT.

Body (JSON):
```json
{
  "correo": "juan@ejemplo.com",
  "contraseña": "password123"
}
```

Respuesta exitosa (201):
```json
{
  "message": "Login con éxito",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "usuario": {
    "id": 1,
    "correo": "juan@ejemplo.com",
    "nombre": "Juan",
    "apellidos": "Pérez García",
    "nick": "juanp",
    "perfil": {
      "id": 2,
      "nombre": "Usuario Regular"
    }
  }
}
```

Respuesta de error (401):
```json
{
  "message": "Sin autorización"
}
```

---

3. Uso del Token JWT

Después de hacer login o registro, recibirás un token JWT. Este token debe incluirse en todas las peticiones a endpoints protegidos.

3.1 Formato del Header

```
Authorization: Bearer <tu_token_jwt>
```

3.2 Ejemplo con cURL

```bash
curl -X GET http://localhost:3000/api/usuarios \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

3.3 Ejemplo con JavaScript (Fetch)

```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

fetch('http://localhost:3000/api/usuarios', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => console.log(data));
```

3.4 Ejemplo con Axios

```javascript
const axios = require('axios');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

axios.get('http://localhost:3000/api/usuarios', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

---

4. Endpoints Protegidos

4.1 Usuarios (Requiere Autenticación)

GET /api/usuarios
- Autenticación: Requerida
- Permisos: Cualquier usuario autenticado
- Descripción: Listar todos los usuarios

GET /api/usuarios/:id
- Autenticación: Requerida
- Permisos: Cualquier usuario autenticado
- Descripción: Obtener un usuario por ID

POST /api/usuarios
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Crear un nuevo usuario

PUT /api/usuarios/:id
- Autenticación: Requerida
- Permisos: Cualquier usuario autenticado
- Descripción: Actualizar un usuario

DELETE /api/usuarios/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Eliminar un usuario

---

4.2 Noticias

GET /api/noticias
- Autenticación: No requerida (Público)
- Descripción: Listar todas las noticias

GET /api/noticias/:id
- Autenticación: No requerida (Público)
- Descripción: Obtener una noticia por ID

POST /api/noticias
- Autenticación: Requerida
- Permisos: Cualquier usuario autenticado
- Descripción: Crear una nueva noticia

PUT /api/noticias/:id
- Autenticación: Requerida
- Permisos: Cualquier usuario autenticado
- Descripción: Actualizar una noticia

DELETE /api/noticias/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Eliminar una noticia

---

4.3 Categorías

GET /api/categorias
- Autenticación: No requerida (Público)
- Descripción: Listar todas las categorías

GET /api/categorias/:id
- Autenticación: No requerida (Público)
- Descripción: Obtener una categoría por ID

POST /api/categorias
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Crear una nueva categoría

PUT /api/categorias/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Actualizar una categoría

DELETE /api/categorias/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Eliminar una categoría

---

4.4 Estados

GET /api/estados
- Autenticación: No requerida (Público)
- Descripción: Listar todos los estados

GET /api/estados/:id
- Autenticación: No requerida (Público)
- Descripción: Obtener un estado por ID

POST /api/estados
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Crear un nuevo estado

PUT /api/estados/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Actualizar un estado

DELETE /api/estados/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Eliminar un estado

---

4.5 Perfiles

GET /api/perfiles
- Autenticación: Requerida
- Permisos: Cualquier usuario autenticado
- Descripción: Listar todos los perfiles

GET /api/perfiles/:id
- Autenticación: Requerida
- Permisos: Cualquier usuario autenticado
- Descripción: Obtener un perfil por ID

POST /api/perfiles
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Crear un nuevo perfil

PUT /api/perfiles/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Actualizar un perfil

DELETE /api/perfiles/:id
- Autenticación: Requerida
- Permisos: Solo Admin (perfil_id = 1)
- Descripción: Eliminar un perfil

---

5. Niveles de Acceso

Perfiles de Usuario

1. Administrador (perfil_id = 1)
   - Acceso completo a todos los endpoints
   - Puede crear, modificar y eliminar cualquier recurso
   - Puede gestionar usuarios, categorías, estados y perfiles

2. Usuario Regular (perfil_id = 2)
   - Puede ver información de usuarios y perfiles
   - Puede crear y modificar noticias
   - No puede eliminar noticias
   - No puede gestionar categorías, estados ni perfiles

---

6. Ejemplos de Uso

6.1 Flujo Completo de Autenticación

Paso 1: Registrar un nuevo usuario

```javascript
fetch('http://localhost:3000/api/auth/registro', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: 'María',
    apellidos: 'González López',
    nick: 'mariag',
    correo: 'maria@ejemplo.com',
    contraseña: 'segura123'
  })
})
.then(response => response.json())
.then(data => {
  console.log('Token recibido:', data.token);
  localStorage.setItem('token', data.token);
});
```

Paso 2: Usar el token para crear una noticia

```javascript
const token = localStorage.getItem('token');

fetch('http://localhost:3000/api/noticias', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    categoria_id: 1,
    estado_id: 1,
    usuario_id: 1,
    titulo: 'Nueva noticia importante',
    fecha_publicacion: '2024-10-17',
    descripcion: 'Esta es una noticia de prueba',
    imagen: 'base64_string_aqui'
  })
})
.then(response => response.json())
.then(data => console.log('Noticia creada:', data));
```

---

6.2 Manejo de Errores de Autenticación

Token no proporcionado (401):
```json
{
  "error": "Token no proporcionado",
  "message": "Se requiere autenticación para acceder a este recurso"
}
```

Token expirado (401):
```json
{
  "error": "Token expirado",
  "message": "El token ha expirado, por favor inicia sesión nuevamente"
}
```

Token inválido (401):
```json
{
  "error": "Token inválido",
  "message": "El token proporcionado no es válido"
}
```

Acceso denegado por permisos (403):
```json
{
  "error": "Acceso denegado",
  "message": "No tienes permisos para realizar esta acción"
}
```

---

6.3 Ejemplo de Aplicación Frontend

```html
<!DOCTYPE html>
<html>
<head>
    <title>API News - Demo</title>
</head>
<body>
    <h1>Login</h1>
    <form id="loginForm">
        <input type="email" id="correo" placeholder="Correo" required>
        <input type="password" id="password" placeholder="Contraseña" required>
        <button type="submit">Iniciar Sesión</button>
    </form>

    <div id="result"></div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const correo = document.getElementById('correo').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        correo: correo,
                        contraseña: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('token', data.token);
                    document.getElementById('result').innerHTML = 
                        `<p>Login exitoso! Token guardado.</p>
                         <p>Usuario: ${data.usuario.nombre}</p>`;
                } else {
                    document.getElementById('result').innerHTML = 
                        `<p style="color: red;">Error: ${data.message}</p>`;
                }
            } catch (error) {
                console.error('Error:', error);
                document.getElementById('result').innerHTML = 
                    `<p style="color: red;">Error de conexión</p>`;
            }
        });
    </script>
</body>
</html>
```

---

7. Notas Importantes

Seguridad:
- Los tokens JWT tienen una duración de 24 horas por defecto
- Las contraseñas actualmente no están hasheadas (MEJORAR EN PRODUCCIÓN)
- Siempre usa HTTPS en producción
- Cambia JWT_SECRET en producción por una clave segura

Mejoras Recomendadas:
- Implementar bcrypt para hashear contraseñas
- Agregar refresh tokens
- Implementar rate limiting
- Agregar validación de roles más granular
- Implementar logout con lista negra de tokens

---

Fecha de creación: Octubre 2025
Versión: 1.0
