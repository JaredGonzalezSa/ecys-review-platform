# Manual de Tareas: Javier Antonio Barrios Calderon

## Rol Asignado
Desarrollador Backend (API REST de Publicaciones y Comentarios).

## Responsabilidades y Objetivos Específicos
Serás el desarrollador clave para el flujo principal de información (las reseñas). Tienes la responsabilidad de modelar los datos de las publicaciones en MySQL y exponer endpoints HTTP para su creación y consulta. Tu código debe ser seguro y validar los identificadores del usuario a través del token de autenticación.

## Especificaciones de Desarrollo (Nivel Arquitectura)

### 1. Modelado de Base de Datos (Scripts SQL)
Deberás crear y proveer al equipo un script SQL (`script_publicaciones.sql`) con lo siguiente:
- **Tabla `publicaciones`:**
  - `id_publicacion` (INT AUTO_INCREMENT PRIMARY KEY)
  - `cui_usuario` (VARCHAR(13), FOREIGN KEY a `usuarios(cui)`)
  - `tipo_referencia` (ENUM('CURSO', 'CATEDRATICO') NOT NULL)
  - `nombre_referencia` (VARCHAR(200) NOT NULL)
  - `mensaje` (TEXT NOT NULL)
  - `fecha_creacion` (DATETIME DEFAULT CURRENT_TIMESTAMP)
- **Tabla `comentarios`:**
  - `id_comentario` (INT AUTO_INCREMENT PRIMARY KEY)
  - `id_publicacion` (INT, FOREIGN KEY a `publicaciones(id_publicacion)`)
  - `cui_usuario` (VARCHAR(13), FOREIGN KEY a `usuarios(cui)`)
  - `mensaje` (TEXT NOT NULL)
  - `fecha_creacion` (DATETIME DEFAULT CURRENT_TIMESTAMP)

### 2. Endpoints de Publicaciones
Crear los archivos `/backend/routes/publicacionesRoutes.js` y `/backend/controllers/publicacionesController.js`.
- **POST `/api/publicaciones`:**
  - **Body esperado:** `tipo_referencia`, `nombre_referencia`, `mensaje`.
  - **Seguridad:** Utilizar el middleware de autenticación (creado por Carlos) para interceptar el JWT y extraer el `cui_usuario`.
  - **Acción:** Insertar registro en base de datos.
- **GET `/api/publicaciones`:**
  - **Query Params aceptados:** `?curso=` y `?catedratico=`.
  - **Acción:** Retornar array de publicaciones. Debes ejecutar un `JOIN` con la tabla `usuarios` para incluir explícitamente el `nombre` y `apellido` del autor en el JSON de respuesta.
  - **Lógica condicional:** Si hay query params, modificar la consulta SQL agregando cláusulas `WHERE nombre_referencia LIKE '%valor%'`. Debe estar ordenado por `fecha_creacion DESC`.

### 3. Endpoints de Comentarios
Crear los archivos `/backend/routes/comentariosRoutes.js` y `/backend/controllers/comentariosController.js`.
- **POST `/api/comentarios`:**
  - **Body esperado:** `id_publicacion`, `mensaje`.
  - **Seguridad:** Extraer `cui_usuario` del token JWT. Insertar en base de datos.
- **GET `/api/publicaciones/:id/comentarios`:**
  - **Parámetro URL:** `id` (ID de la publicación).
  - **Acción:** Retornar lista de comentarios asociados a la publicación, haciendo `JOIN` con `usuarios` para incluir el nombre del comentarista.

## Dependencias Técnicas
- **Pre-requisitos:** El servidor Base de Node.js, conexión MySQL (`db.js`) y Middleware JWT creados por Carlos deben estar en la rama `main`.
- **Bloqueantes:** Abner requiere tu endpoint `GET /api/publicaciones` para desarrollar el Feed. Héctor requiere tus endpoints `POST` para desarrollar los formularios.

## Flujo de Trabajo Git (Nivel Profesional)
1. **Actualización del repositorio local y creación de rama:**
   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   git checkout -b feature/api-reseñas-comentarios
   ```
2. **Desarrollo iterativo (commits granulares):**
   ```bash
   git add .
   git commit -m "feat(backend): creacion de endpoints CRUD para tabla publicaciones"
   ```
3. **Manejo de actualizaciones asíncronas:** Si Carlos modificó algo en el backend mientras programabas:
   ```bash
   git fetch origin
   git rebase origin/main
   # (Si hay conflictos, editarlos en el editor, git add y git rebase --continue)
   ```
4. **Push de la rama:**
   ```bash
   git push origin feature/api-reseñas-comentarios
   ```
5. **Crear Pull Request.**

## Criterios de Aceptación
1. Scripts SQL ejecutables sin errores de sintaxis.
2. Los 4 endpoints retornan respuestas JSON estructuradas (ej: `{ success: true, data: [...] }`).
3. Los endpoints `POST` rechazan la petición (HTTP 401 Unauthorized) si no se provee un token JWT válido.
4. Filtros por curso y catedrático en peticiones GET operando correctamente.
