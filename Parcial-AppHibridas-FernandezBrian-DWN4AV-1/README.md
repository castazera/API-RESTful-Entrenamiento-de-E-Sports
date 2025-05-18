# API REST de eSports Training

API REST desarrollada para la gestión de jugadores y sesiones de entrenamiento de eSports, construida con Node.js, Express y MongoDB.

## 🚀 Características

- Autenticación JWT para usuarios
- Gestión de jugadores y sesiones de entrenamiento
- Validación de datos con Joi
- Filtrado, ordenamiento y paginación de resultados
- Documentación de API con Swagger
- Manejo de errores centralizado
- Middleware de logging

## 📋 Prerrequisitos

- Node.js (v14 o superior)
- MongoDB
- npm o yarn

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/EntrenamientoESports
JWT_SECRET=tu_secreto_jwt
```

4. Iniciar el servidor:
```bash
npm start
```

## 📁 Estructura del Proyecto

```
src/
├── config/         # Configuraciones (MongoDB, JWT)
├── controllers/    # Controladores de la aplicación
├── middleware/     # Middleware personalizado
├── models/         # Modelos de Mongoose
├── routes/         # Rutas de la API
├── validation/     # Validaciones
└── app.js          # Punto de entrada de la aplicación
```

## 🔐 Autenticación

La API utiliza JWT (JSON Web Tokens) para la autenticación. Para acceder a las rutas protegidas, incluye el token en el header de la petición:

```
Authorization: Bearer <tu_token>
```

## 📚 Endpoints

### Jugadores

- `GET /api/jugadores` - Obtener lista de jugadores
- `GET /api/jugadores/:id` - Obtener jugador por ID
- `POST /api/jugadores` - Crear nuevo jugador
- `PUT /api/jugadores/:id` - Actualizar jugador
- `DELETE /api/jugadores/:id` - Eliminar jugador

### Sesiones de Entrenamiento

- `GET /api/entrenamientos` - Obtener lista de sesiones
- `GET /api/entrenamientos/:id` - Obtener sesión por ID
- `POST /api/entrenamientos` - Crear nueva sesión
- `PUT /api/entrenamientos/:id` - Actualizar sesión
- `DELETE /api/entrenamientos/:id` - Eliminar sesión

## 🔍 Filtrado y Paginación

Los endpoints de listado soportan los siguientes parámetros de consulta:

- `page`: Número de página (default: 1)
- `limit`: Elementos por página (default: 10)
- `sort`: Campo para ordenar (ej: `-createdAt` para orden descendente)
- `filter`: Filtros específicos por campo

## 🛠️ Tecnologías Utilizadas

- Node.js
- Express
- MongoDB con Mongoose
- JWT para autenticación
- Joi para validación
- bcrypt para encriptación
- dotenv para variables de entorno

## 📝 Licencia

Este proyecto está bajo la Licencia ISC.

## 👥 Contribución

1. Fork el proyecto
2. Crea tu rama de características (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Fernandez, Brian Gabriel - briangfernandez011@gmail.com

Link del Proyecto: https://github.com/castazera/API-RESTful-Entrenamiento-de-E-Sports
