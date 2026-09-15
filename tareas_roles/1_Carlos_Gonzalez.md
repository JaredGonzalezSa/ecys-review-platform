# Manual de Tareas: Carlos Alfonzo Jared González Sagastume

## Rol Asignado
Líder del Proyecto y Arquitecto de Software (Responsable del 40% inicial).

## Responsabilidades y Objetivos Específicos
Tu objetivo es inicializar la arquitectura del proyecto, tanto en el Backend como en el Frontend, establecer la base de datos y desarrollar el sistema núcleo de Autenticación. El resto del equipo dependerá estrictamente de la estructura y estándares que definas en este paso.

## Especificaciones de Desarrollo (Nivel Arquitectura)

### 1. Repositorio y Versionamiento
- Inicializar repositorio en GitHub (`ecys-review-platform`).
- Configurar el archivo `.gitignore` para excluir `node_modules`, archivos `.env`, y compilados.
- Proteger la rama `main` requiriendo revisión de Pull Requests (PRs).
- Agregar a los 5 miembros restantes como colaboradores.

### 2. Configuración Backend (Node.js + Express)
- Inicializar paquete: `npm init -y` dentro de una carpeta `/backend`.
- Instalar dependencias base: `express`, `mysql2`, `cors`, `dotenv`, `bcrypt`, `jsonwebtoken`.
- Estructura de directorios obligatoria:
  - `/backend/config/db.js`: Archivo con el pool de conexión a MySQL usando `mysql2/promise` y variables de entorno (`process.env.DB_HOST`, etc.).
  - `/backend/server.js`: Punto de entrada que inicialice Express, aplique middlewares (`cors()`, `express.json()`) y levante el servidor en el puerto 3000.
  - `/backend/routes/authRoutes.js`: Definición de endpoints de autenticación.
  - `/backend/controllers/authController.js`: Lógica de negocio.
  - `/backend/middlewares/authMiddleware.js`: Middleware para verificar el token JWT en rutas protegidas.

### 3. Base de Datos (MySQL)
- Proveer al equipo un script SQL (`database.sql`) con la creación de la base de datos `ecys_db`.
- Crear la tabla `usuarios`:
  - `cui` (VARCHAR(13), PRIMARY KEY)
  - `nombres` (VARCHAR(100), NOT NULL)
  - `apellidos` (VARCHAR(100), NOT NULL)
  - `email` (VARCHAR(100), UNIQUE, NOT NULL)
  - `password_hash` (VARCHAR(255), NOT NULL)

### 4. API de Autenticación (Endpoints)
- `POST /api/auth/register`: Recibe JSON con CUI, nombres, apellidos, email, password. Hashear password con `bcrypt` (salt rounds: 10). Insertar en MySQL.
- `POST /api/auth/login`: Recibe CUI y password. Verificar con `bcrypt.compare`. Si es exitoso, generar un `jsonwebtoken` (JWT) firmado que incluya el CUI en el payload. Retornar el token al cliente.
- `POST /api/auth/reset-password`: Recibe CUI y email. (Simular recuperación actualizando el password directo o enviando un token temporal según definas la lógica).

### 5. Configuración Frontend (React + Vite)
- Inicializar dentro de la carpeta `/frontend` usando `npm create vite@latest . -- --template react`.
- Instalar dependencias: `react-router-dom`, `axios`. (Uso de CSS puro para estilos, según requerimientos técnicos).
- Estructura de carpetas:
  - `/frontend/src/pages/`
  - `/frontend/src/components/`
  - `/frontend/src/services/api.js`: Instancia global de Axios (`axios.create`) que intercepte las peticiones y adjunte el JWT del `localStorage` en el header `Authorization: Bearer <token>`.
- Configurar enrutamiento base en `App.jsx` con React Router (ej: `/login`, `/register`, `/home`).

## Dependencias Técnicas
- **Pre-requisitos:** Ninguno. Eres el iniciador.
- **Bloqueantes:** Todo el equipo está bloqueado hasta que esta estructura inicial sea subida a la rama `main`.

## Flujo de Trabajo Git (Nivel Profesional)
1. **Inicializar y subir base:**
   ```bash
   git init
   git add .
   git commit -m "chore: setup inicial de arquitectura monorepo (backend/frontend)"
   git branch -M main
   git remote add origin <URL_DEL_REPOSITORIO>
   git push -u origin main
   ```
2. **Para revisiones posteriores:**
   - No comitearás directamente a `main` después de esto. Trabajarás en ramas `feature/*` o revisarás los Pull Requests del equipo y los aprobarás.

## Criterios de Aceptación
1. Servidor Backend corriendo y conectado a MySQL sin errores.
2. Frontend compilando correctamente vía Vite.
3. Endpoints de Registro y Login probados y devolviendo JWT.
4. Código base en `main` disponible para todos.
5. Archivo `.env.example` subido al repositorio para que el equipo sepa qué credenciales locales de DB configurar.
