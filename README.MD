# LIBROPIA - Aplicación de Gestión de Biblioteca Digital

Una aplicación web moderna para gestionar tu biblioteca personal de libros, clasificarlos por estado de lectura y marcar tus favoritos.

## 🚀 Características

- **Autenticación segura**: Sistema de login y registro con tokens JWT
- **Gestión de perfil**: Ver y editar información personal
- **Biblioteca personal**: Organiza tus libros en categorías:
  - Pendiente de leer
  - Leyendo actualmente
  - Ya leído
- **Favoritos**: Marca tus libros preferidos
- **Búsqueda**: Busca libros por título, autor o categoría
- **Gestión de cuenta**: Opción para eliminar la cuenta
- **Persistencia**: Todos los datos guardados en base de datos MongoDB (incluyendo biblioteca personal y favoritos)

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- MongoDB (conexión local o remota)
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el repositorio
```bash
git clone <repositorio>
cd "app proyecto final"
```

### 2. Configurar Backend

```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend`:
```
PORT=3000
URL_MONGODB=mongodb://localhost:27017/libropia
BCRYPT_ROUNDS=10
JWT_SECRET=tu_clave_secreta_jwt
```

### 3. Configurar Frontend

```bash
cd ../frontend
npm install
```

## ▶️ Ejecutar la Aplicación

### Backend
```bash
cd backend
npm run dev
```
El servidor estará disponible en `http://localhost:3000`

### Frontend
```bash
cd frontend
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

## 📚 Cargar Base de Datos de Libros

**IMPORTANTE**: Antes de usar la aplicación, debes poblar la base de datos con los libros disponibles.

### Pasos:

1. **Asegúrate que MongoDB está en ejecución** en localhost (o ajusta la URL en `.env`)

2. **Ejecuta el script de inserción** desde la carpeta backend:
```bash
cd backend
node src/db/insertarLibros.js
```

3. **Espera a que finalice** - Verás un mensaje confirmando que los libros se han insertado correctamente.

### ¿Qué sucede?
- El script `insertarLibros.js` contiene una lista de +25 libros predefinidos
- Se conecta a MongoDB automáticamente
- Crea la colección `books` si no existe
- Inserta todos los libros en la base de datos

### Estructura de datos de cada libro:
```json
{
  "titulo": "Nombre del libro",
  "autor": "Nombre del autor",
  "fechaPublicacion": "año",
  "rating": 4.5,
  "descripcion": "Descripción del libro",
  "categoria": "Categoría",
  "isbn": "ISBN único",
  "cover": "URL de la portada"
}
```

### Agregar más libros
Si necesitas agregar libros personalizados:
1. Abre `backend/src/db/insertarLibros.js`
2. Agrega un nuevo objeto a la array `librosApp` con la estructura anterior
3. Ejecuta de nuevo: `node src/db/insertarLibros.js`

## 📁 Estructura del Proyecto

```
app proyecto final/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Controladores de rutas
│   │   ├── models/          # Modelos de datos (Mongoose)
│   │   ├── routes/          # Definición de rutas
│   │   ├── middleware/      # Middleware de autenticación
│   │   ├── utils/           # Utilidades (tokens JWT)
│   │   └── db/              # Configuración de BD
│   ├── app.js               # Archivo principal
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Componentes React
    │   ├── pages/           # Páginas de la aplicación
    │   ├── services/        # Servicios API
    │   ├── styles/          # Estilos CSS
    │   ├── utils/           # Utilidades
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🔑 Funcionalidades Principales

### Autenticación
- Registro de nuevos usuarios
- Login con email y contraseña
- Token JWT para sesiones seguras
- Renovación automática de tokens

### Perfil de Usuario
- Ver información personal
- Editar nombre, apellido y edad
- Cancelar cambios sin guardar
- Opción de eliminar cuenta

### Biblioteca Personal
- Ver todos los libros disponibles
- Organizar libros por estado
- Marcar como favoritos
- Búsqueda de libros

### HomePage
- Visualización de libros en grid
- Búsqueda en tiempo real
- Filtrado por categoría
- Acceso rápido a Biblioteca y Perfil

## 🔐 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación con JWT
- Tokens de refresco
- Middleware de validación en rutas protegidas
- Variables de entorno para datos sensibles

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **bcrypt** - Hashing de contraseñas
- **jsonwebtoken** - Autenticación JWT

### Frontend
- **React** - Librería de UI
- **Vite** - Bundler y dev server
- **React Router** - Enrutamiento
- **CSS3** - Estilos

## 📝 Uso Básico

1. **Registro**: Crea una nueva cuenta con email y contraseña
2. **Login**: Inicia sesión con tus credenciales
3. **Explorar**: Ve a HomePage para ver todos los libros disponibles
4. **Organizar**: Accede a Biblioteca para clasificar tus libros
5. **Perfil**: Edita tu información personal en la página de Perfil

## 🐛 Solución de Problemas

### El servidor no inicia
- Verifica que MongoDB esté en ejecución
- Comprueba que el puerto 3000 no esté en uso
- Revisa las variables de entorno en `.env`

### Problemas de conexión Frontend-Backend
- Verifica que el backend esté corriendo en `http://localhost:3000`
- Comprueba los CORS configurados en `app.js`
- Revisa la consola del navegador para errores

### Errores de autenticación
- Inicia sesión nuevamente si los tokens han expirado
- Verifica que el servidor MongoDB esté accesible

## 📄 Licencia

Este proyecto está bajo licencia ISC.

## 👤 Autor

Alejandro Marin del Toro - Proyecto Final

---

**Última actualización**: Enero 2026
