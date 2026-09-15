# Manual de Tareas: Steven Jorge Luis Aguilar Pacheco

## Rol Asignado
Desarrollador Frontend (Módulos de Autenticación y Visualización de Perfil).

## Responsabilidades y Objetivos Específicos
Eres responsable de construir las interfaces de usuario mediante las cuales los estudiantes ingresan al sistema. Deberás crear formularios robustos, aplicar validaciones estrictas en el lado del cliente y gestionar el estado de sesión conectando tus vistas con la API creada por el líder del proyecto.

## Especificaciones de Desarrollo (Nivel Arquitectura)

### 1. Pantalla de Inicio de Sesión (Login)
- **Archivo:** `/frontend/src/pages/Login.jsx`
- **Diseño:** Basado estrictamente en la maqueta del PDF (logo de la facultad, campos centrados). Utilizar CSS puro, evitando frameworks no autorizados.
- **Campos:** Input de texto para CUI/Registro Académico, Input de tipo password.
- **Validaciones:** El CUI debe contener únicamente números. Ningún campo puede estar vacío.
- **Conexión API:** Realizar petición POST mediante la instancia Axios centralizada (`/frontend/src/services/api.js`) hacia `/api/auth/login`.
- **Manejo de Estado:** Al recibir respuesta HTTP 200, extraer el JWT de la respuesta, guardarlo en `localStorage` bajo la llave `token`, y redirigir programáticamente a la ruta `/home` usando el hook `useNavigate` de `react-router-dom`.

### 2. Pantalla de Registro (Register)
- **Archivo:** `/frontend/src/pages/Register.jsx`
- **Campos:** CUI, Nombres, Apellidos, Correo Electrónico (type="email"), Contraseña.
- **Validaciones:** Validar formato de correo mediante Expresión Regular. Validar longitud mínima de contraseña (ej. 8 caracteres).
- **Conexión API:** Petición POST a `/api/auth/register`. Manejar errores HTTP 400 (ej. usuario ya existe) mostrando alertas en pantalla (no `alert()` nativo, preferible texto en un `div` de error).
- **Manejo de Estado:** En éxito, redirigir a `/login`.

### 3. Pantalla de Recuperación de Contraseña (Forgot Password)
- **Archivo:** `/frontend/src/pages/ForgotPassword.jsx`
- **Campos:** CUI y Correo Electrónico. 
- **Conexión API:** Petición POST a `/api/auth/reset-password`. Proveer retroalimentación visual al usuario según la respuesta.

### 4. Pantalla de Perfil de Usuario (Profile Base)
- **Archivo:** `/frontend/src/pages/Profile.jsx`
- **Objetivo:** Maquetar la interfaz donde un usuario visualiza su información (Nombre, CUI, Correo).
- **Nota:** La integración de datos para esta pantalla requiere los endpoints que desarrollará Elman. Tu labor es tener la vista HTML/CSS lista y estructurada (usa datos estáticos o variables locales temporales).

## Dependencias Técnicas
- **Pre-requisitos:** Requieres que Carlos haya integrado la base de React, el router en `App.jsx`, y que la API REST de Autenticación esté funcional en `main`.
- **Bloqueantes:** Abner y Héctor necesitan que el Login funcione para que se guarde el JWT en el sistema y ellos puedan hacer peticiones autenticadas.

## Flujo de Trabajo Git (Nivel Profesional)
Para garantizar la integridad del código, el flujo a seguir será estrictamente basado en Feature Branches.

1. **Sincronización inicial del código base (ejecutar en la raíz del repositorio local):**
   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   ```
2. **Creación de rama aislada para desarrollo:**
   ```bash
   git checkout -b feature/frontend-auth
   ```
3. **Desarrollo y guardado progresivo (repetir según se avance):**
   ```bash
   git add .
   git commit -m "feat(frontend): implementacion de formulario de login y almacenamiento JWT"
   ```
4. **Sincronización previo al Push (para evitar conflictos si main fue modificado):**
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/frontend-auth
   git merge main
   ```
   *(Resolver conflictos de fusión manualmente si ocurren, antes de continuar).*
5. **Subida de cambios al repositorio remoto:**
   ```bash
   git push origin feature/frontend-auth
   ```
6. **Integración:** Crear un Pull Request en GitHub apuntando hacia `main`. Asignar a Carlos como revisor.

## Criterios de Aceptación
1. El usuario puede registrarse y los datos se persisten en MySQL.
2. El usuario puede iniciar sesión; el JWT se guarda en `localStorage`.
3. Validaciones de cliente funcionan correctamente e impiden envíos inválidos al backend.
4. Navegación fluida entre `/login`, `/register` y `/home`.
