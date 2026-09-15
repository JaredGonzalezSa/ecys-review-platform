# 🎓 ECYS Review Platform

Plataforma de evaluación y retroalimentación para catedráticos y cursos de la Facultad de Ingeniería.

## 🚀 Tecnologías Principales
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Base de Datos:** MySQL (Alojada centralizadamente en TiDB Serverless)
- **Autenticación:** JWT (JSON Web Tokens) + Bcrypt

## 📋 Arquitectura y Organización del Equipo
Este proyecto funciona bajo una arquitectura cliente-servidor centralizada en un Monorepo. El trabajo está altamente dividido y documentado.

- `/backend`: Contiene toda la lógica del servidor, conexiones a DB y endpoints REST.
- `/frontend`: Contiene la aplicación web (Single Page Application).
- `/tareas_roles`: Manuales de especificaciones estrictas para cada desarrollador del grupo.

## ⚙️ ¿Cómo ejecutar el proyecto localmente?

### 1. Clonar el repositorio
```bash
git clone <URL_DEL_REPOSITORIO>
cd ecys-review-platform
```

### 2. Levantar el Backend (Servidor)
Asegúrate de copiar el archivo `.env` guiándote con el archivo `CREDENCIALES.md`.
```bash
cd backend
npm install
node server.js
```
*El servidor correrá en `http://localhost:3000` y confirmará la conexión a TiDB.*

### 3. Levantar el Frontend (Interfaz Visual)
En una nueva terminal:
```bash
cd frontend
npm install
npm run dev
```
*La aplicación estará disponible en `http://localhost:5173`.*

---
**Documentación Final (Pendiente de Redactar):**
- [ ] Manual Técnico
- [ ] Manual de Usuario

> Proyecto Universitario - Prácticas Iniciales (Segundo Semestre 2026)
