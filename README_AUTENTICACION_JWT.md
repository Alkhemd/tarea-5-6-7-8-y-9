Guía Completa de Autenticación y Autorización con JWT

Introducción

Esta documentación explica los conceptos fundamentales de **autenticación** y **autorización** en APIs REST, con enfoque en la implementación de **JSON Web Tokens (JWT)**.

---

¿Qué son Autenticación y Autorización?

Autenticación

**Definición:** Proceso de verificar la identidad de un usuario o aplicación antes de permitir el acceso a la API.

**Objetivo:** Asegurar que solo las entidades autorizadas puedan utilizar los servicios de la API.

**Ejemplos de métodos:**
- Tokens de acceso (JWT, OAuth)
- Claves de API (API Keys)
- Usuario y contraseña
- Certificados digitales
- Autenticación de dos factores (2FA)

**Beneficios:**
- Evita accesos no autorizados
- Protege recursos sensibles
- Previene acciones no permitidas

---

Autorización

**Definición:** Proceso que determina qué acciones y recursos específicos puede acceder un usuario autenticado.

**Objetivo:** Establecer niveles de acceso y permisos para cada usuario.

**Ejemplos de roles:**
```
- Administrador    → CRUD completo (Crear, Leer, Actualizar, Eliminar)
- Usuario Regular  → Leer y Actualizar sus propios datos
- Invitado        → Solo lectura
```

**Beneficios:**
- Control granular de permisos
- Protección de información confidencial
- Integridad de datos
- Auditoría de acciones

---

¿Qué es JWT (JSON Web Token)?

**JWT** es un estándar abierto ([RFC 7519](https://tools.ietf.org/html/rfc7519)) que define un formato compacto y seguro para transmitir información entre dos partes.

Estructura de un JWT

Un JWT consta de **3 partes** separadas por puntos (`.`) y codificadas en **Base64 URL**:

```
HEADER.PAYLOAD.SIGNATURE
```

---

Encabezado (Header)

Contiene metadatos sobre el token:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

**Campos:**
- `alg`: Algoritmo de firma (ej: HS256, RS256)
- `typ`: Tipo de token (siempre "JWT")

---

Carga Útil (Payload)

Contiene la información que se desea transmitir:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1678425600,
  "exp": 1678429200
}
```

**Campos comunes (Claims):**
- `sub` (subject): Identificador del usuario
- `name`: Nombre del usuario
- `iat` (issued at): Fecha de emisión
- `exp` (expiration): Fecha de expiración
- `iss` (issuer): Emisor del token
- `aud` (audience): Destinatario del token
- Campos personalizados (roles, permisos, etc.)

---

Firma (Signature)

Garantiza la integridad y autenticidad del token:

```
HMACSHA256(
  base64UrlEncode(header) + "." + base64UrlEncode(payload),
  secret
)
```

**Componentes:**
- `header` y `payload` codificados en Base64 URL
- `secret`: Clave secreta compartida (solo conocida por emisor y receptor)
- Algoritmo de firma (especificado en el header)

---

Expiración de Tokens

¿Por qué es importante?

El campo `exp` (expiration) define cuándo el token deja de ser válido:

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "exp": 1678425600
}
```

**Formato:** Unix Timestamp (segundos desde 01/01/1970 00:00:00 UTC)

**Beneficios:**
- Controla la duración de sesiones
- Limita el tiempo de uso de tokens comprometidos
- Fuerza renovación periódica

**Ejemplo de conversión:**
```javascript
// Crear token que expira en 1 hora
const expiration = Math.floor(Date.now() / 1000) + (60 * 60);

// O usando la librería:
jwt.sign(payload, secret, { expiresIn: '1h' });
```

---

Funciones Principales de JWT (librería jsonwebtoken)

`jwt.sign()` - Generar Token

**Sintaxis:**
```javascript
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

**Parámetros:**
- `payload` (Object): Datos a incluir en el token
- `secretOrPrivateKey` (String): Clave secreta para firmar
- `options` (Object, opcional): Configuración adicional
- `callback` (Function, opcional): Callback de retorno

**Ejemplo:**
```javascript
const jwt = require('jsonwebtoken');

const payload = {
  id: 123,
  email: 'usuario@ejemplo.com',
  role: 'admin'
};

const secret = 'mi_clave_secreta_super_segura';

const token = jwt.sign(payload, secret, {
  expiresIn: '24h',      // Expira en 24 horas
  issuer: 'mi-api',      // Emisor
  algorithm: 'HS256'     // Algoritmo de firma
});

console.log(token);
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzLCJlbWFpbCI6InVzdWFyaW9AZWplbXBsby5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzg0MjU2MDAsImV4cCI6MTY3ODUxMjAwMH0.abc123xyz
```

**Opciones comunes:**
- `expiresIn`: Tiempo de expiración ('1h', '7d', '30m')
- `algorithm`: Algoritmo de firma (HS256, RS256)
- `issuer`: Quien emite el token
- `audience`: Para quien es el token
- `notBefore`: Antes de esta fecha no es válido

---

`jwt.verify()` - Verificar Token

**Sintaxis:**
```javascript
jwt.verify(token, secretOrPublicKey, [options, callback])
```

**Parámetros:**
- `token` (String): JWT a verificar
- `secretOrPublicKey` (String): Clave secreta/pública
- `options` (Object, opcional): Opciones de verificación
- `callback` (Function, opcional): Callback de retorno

**Ejemplo:**
```javascript
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
const secret = 'mi_clave_secreta_super_segura';

try {
  const decoded = jwt.verify(token, secret);
  console.log('Token válido:', decoded);
  /*
  {
    id: 123,
    email: 'usuario@ejemplo.com',
    role: 'admin',
    iat: 1678425600,
    exp: 1678512000
  }
  */
} catch (error) {
  console.error('Token inválido:', error.message);
  // Posibles errores:
  // - TokenExpiredError: Token expirado
  // - JsonWebTokenError: Token malformado o firma inválida
  // - NotBeforeError: Token usado antes de tiempo
}
```

**Opciones de verificación:**
- `algorithms`: Array de algoritmos permitidos
- `issuer`: Validar emisor específico
- `audience`: Validar destinatario
- `maxAge`: Edad máxima del token

---

Flujo de Autenticación con JWT

1. Login (Autenticación)

```
Cliente                    Servidor
  |                           |
  |  POST /login             |
  |  { email, password }     |
  |------------------------->|
  |                          | 1. Verificar credenciales
  |                          | 2. Generar JWT
  |                          |
  |  200 OK                  |
  |  { token: "eyJ..." }     |
  |<-------------------------|
  |                          |
```

2. Acceso a Recursos Protegidos

```
Cliente                    Servidor
  |                           |
  |  GET /api/usuarios       |
  |  Authorization:          |
  |  Bearer eyJ...           |
  |------------------------->|
  |                          | 1. Extraer token
  |                          | 2. Verificar token
  |                          | 3. Validar permisos
  |                          |
  |  200 OK                  |
  |  { data: [...] }         |
  |<-------------------------|
  |                          |
```

---

Envío de JWT en Solicitudes HTTP

Formato estándar (Header Authorization)

```http
GET /api/usuarios HTTP/1.1
Host: localhost:3000
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**En JavaScript/Axios:**
```javascript
axios.get('/api/usuarios', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

**En Fetch API:**
```javascript
fetch('/api/usuarios', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

---

Consideraciones de Seguridad

Buenas Prácticas

1. **Clave Secreta Fuerte:**
   ```javascript
   // MAL
   const secret = '123456';
   
   // BIEN
   const secret = process.env.JWT_SECRET; // Desde variable de entorno
   // Valor: 'aB3$9xK@mN7!pQ2zR5&tY8^wL4#vC6*uE1'
   ```

2. **Tiempo de Expiración Corto:**
   ```javascript
   // Tokens de acceso: 15min - 1h
   jwt.sign(payload, secret, { expiresIn: '1h' });
   
   // Refresh tokens: 7-30 días
   jwt.sign(payload, secret, { expiresIn: '7d' });
   ```

3. **HTTPS Obligatorio:**
   - Siempre usar HTTPS en producción
   - Los JWT no están cifrados

4. **No Almacenar Datos Sensibles:**
   ```javascript
   // MAL - El payload es visible
   const payload = {
     id: 123,
     password: 'miPassword123',      // ¡NO!
     creditCard: '1234-5678-9012'    // ¡NO!
   };
   
   // BIEN
   const payload = {
     id: 123,
     email: 'user@example.com',
     role: 'admin'
   };
   ```

5. **Validar Siempre el Token:**
   ```javascript
   // Middleware de autenticación
   const authMiddleware = (req, res, next) => {
     const token = req.headers.authorization?.split(' ')[1];
     
     if (!token) {
       return res.status(401).json({ error: 'Token requerido' });
     }
     
     try {
       const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = decoded; // Adjuntar usuario a la petición
       next();
     } catch (error) {
       return res.status(401).json({ error: 'Token inválido' });
     }
   };
   ```

---

Riesgos y Mitigaciones

| Riesgo | Descripción | Mitigación |
|--------|-------------|------------|
| **Token Robado** | Si alguien obtiene el token puede usarlo | • Expiración corta<br>• HTTPS obligatorio<br>• Tokens en httpOnly cookies |
| **Payload Visible** | El payload está codificado, no cifrado | • No incluir datos sensibles<br>• Solo IDs y referencias |
| **Revocación** | JWT no puede ser revocado antes de expirar | • Lista negra de tokens<br>• Refresh tokens<br>• Versionado de claves |
| **Clave Comprometida** | Si se filtra la clave, todos los tokens son vulnerables | • Rotar claves periódicamente<br>• Variables de entorno<br>• Gestores de secretos |

---

Ventajas y Desventajas de JWT

Ventajas

- **Stateless**: No requiere almacenar sesiones en el servidor
- **Escalable**: Ideal para arquitecturas distribuidas
- **Compacto**: Tamaño reducido, fácil de transmitir
- **Autocontenido**: Incluye toda la información necesaria
- **Multi-dominio**: Funciona entre diferentes dominios
- **Estándar**: RFC 7519, ampliamente soportado

Desventajas

- **No Revocable**: Difícil de invalidar antes de expiración
- **Tamaño**: Más grande que un session ID simple
- **Seguridad**: Si se compromete la clave, todos los tokens son vulnerables
- **No Cifrado**: El payload es visible (solo codificado)

---

Instalación y Uso Básico

Instalación

```bash
npm install jsonwebtoken
```

Ejemplo Completo en Express

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || 'clave_secreta_desarrollo';

// Ruta de login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  // Buscar usuario en BD (ejemplo simplificado)
  const user = await User.findOne({ where: { email } });
  
  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  
  // Verificar contraseña
  const validPassword = await bcrypt.compare(password, user.password);
  
  if (!validPassword) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }
  
  // Generar token
  const token = jwt.sign(
    { 
      id: user.id,
      email: user.email,
      role: user.role 
    },
    SECRET,
    { expiresIn: '24h' }
  );
  
  res.json({ token, user: { id: user.id, email: user.email } });
});

// Middleware de autenticación
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }
  
  const token = authHeader.split(' ')[1]; // Bearer TOKEN
  
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// Middleware de autorización
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'No tienes permisos para realizar esta acción' 
      });
    }
    next();
  };
};

// Ruta protegida (solo autenticados)
app.get('/api/profile', authenticate, (req, res) => {
  res.json({ user: req.user });
});

// Ruta protegida (solo administradores)
app.delete('/api/users/:id', authenticate, authorize('admin'), (req, res) => {
  // Solo usuarios con rol 'admin' pueden acceder
  res.json({ message: 'Usuario eliminado' });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
```

---

Resumen

Esta documentación cubre los conceptos fundamentales de:

1. **Autenticación**: Verificación de identidad
2. **Autorización**: Control de permisos y accesos
3. **JWT**: Estándar para tokens seguros
   - Estructura (Header, Payload, Signature)
   - Expiración y validez
   - Funciones `sign()` y `verify()`
4. **Seguridad**: Buenas prácticas y consideraciones
5. **Implementación**: Ejemplo práctico con Express

---

Referencias

- [RFC 7519 - JSON Web Token](https://tools.ietf.org/html/rfc7519)
- [jwt.io - JWT Debugger](https://jwt.io/)
- [Documentación jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)
- [OWASP - Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)

---

Notas del Curso

> Este documento contiene la información teórica proporcionada en el curso sobre autenticación, autorización y JSON Web Tokens (JWT). Es material de referencia para comprender los fundamentos de seguridad en APIs REST antes de implementar estos conceptos en proyectos reales.

**Conceptos clave aprendidos:**
- Diferencia entre autenticación y autorización
- Estructura y funcionamiento de JWT
- Generación y verificación de tokens
- Manejo de expiración
- Consideraciones de seguridad
- Implementación práctica en Node.js/Express

---

**Fecha de creación:** Octubre 2025  
**Versión:** 1.0
