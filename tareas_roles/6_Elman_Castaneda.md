# Manual de Tareas: Elman Efraín Castañeda Mancio

## Rol Asignado
Desarrollador Backend (API REST de Perfiles Estudiantiles y Puente de Datos).

## Responsabilidades y Objetivos Específicos
Tu misión es diseñar los puntos de acceso de la API que permitan gestionar la información personalizada del estudiante, específicamente la relación entre usuarios y los cursos que han aprobado en la facultad. Adicionalmente, crearás un proxy en el backend para servir un catálogo oficial.

## Especificaciones de Desarrollo (Nivel Arquitectura)

### 1. Modelado Relacional de Cursos (SQL)
- Diseñar el script SQL `script_perfil_cursos.sql`.
- **Tabla `cursos_aprobados`:**
  - `id_registro` (INT AUTO_INCREMENT PRIMARY KEY)
  - `cui_usuario` (VARCHAR(13), FOREIGN KEY ref `usuarios(cui)`)
  - `codigo_curso` (VARCHAR(20) NOT NULL).
  - Restricción lógica: Definir una llave única combinada `UNIQUE(cui_usuario, codigo_curso)` para evitar inserciones duplicadas (que un alumno asigne el mismo curso dos veces).

### 2. Endpoints de Perfil Personalizado
Desarrollar el controlador `/backend/controllers/perfilController.js` y rutear en `/backend/routes/perfilRoutes.js`.
- **GET `/api/perfiles/:cui`:**
  - **Acción:** Consultar la tabla `usuarios` buscando el `cui` especificado.
  - **Seguridad y Serialización:** Excluir explícitamente el campo `password_hash` del SELECT. Retornar solo nombres, apellidos, y correo.
  - **Datos Asociados:** Ejecutar una subconsulta o consulta separada para extraer todos los `codigo_curso` asociados a este usuario y empaquetarlos como un Array dentro del objeto JSON de respuesta.
- **POST `/api/perfiles/cursos-aprobados`:**
  - **Seguridad:** Requiere middleware JWT de autenticación. Extraer el `cui_usuario` emisor desde el JWT y no desde el body, para evitar suplantaciones de identidad.
  - **Body esperado:** `codigo_curso`.
  - **Acción:** Insertar en base de datos. Manejar correctamente la violación de llave única enviando un HTTP 409 Conflict si el estudiante ya tenía asignado ese curso.
- **DELETE `/api/perfiles/cursos-aprobados/:codigo_curso`:**
  - Proveer la capacidad de remover un curso aprobado en caso de error del estudiante.

### 3. Catálogo de Cursos en Base de Datos
- **Tabla `cursos`:**
  - Crear el script SQL para la tabla `cursos` (codigo_curso VARCHAR(20) PRIMARY KEY, nombre VARCHAR(200) NOT NULL).
  - Proveer un script de "Seeding" (población de datos) que lea el archivo provisional `cursos.json` solo una vez y realice los INSERTS iniciales en la base de datos para que todos tengan el catálogo oficial.
- **GET `/api/cursos`:**
  - Crearás un endpoint que consulte la tabla `cursos` (`SELECT * FROM cursos`) y retorne el catálogo completo al Frontend.

## Dependencias Técnicas
- **Pre-requisitos:** Tabla de usuarios base definida por Carlos. Servidor Express funcional.
- **Bloqueantes:** Steven requiere los datos combinados de tu endpoint `GET /api/perfiles/:cui` para renderizar la Vista de Perfil (`Profile.jsx`) del lado del cliente.

## Flujo de Trabajo Git (Nivel Profesional)
1. **Sincronización del entorno:**
   ```bash
   git fetch origin
   git checkout main
   git pull origin main
   git checkout -b feature/api-gestion-perfiles
   ```
2. **Generación de módulos y confirmación semántica:**
   ```bash
   git add backend/routes/perfilRoutes.js backend/controllers/perfilController.js
   git commit -m "feat(backend): implementacion de perfiles y asociacion de cursos aprobados"
   ```
3. **Fusión en la ruta principal (Router):** Si necesitas registrar tus rutas en el archivo centralizado `server.js` de Carlos, hazlo con cautela:
   ```bash
   git add backend/server.js
   git commit -m "chore(backend): registro de rutas de perfil en aplicacion base"
   ```
4. **Publicación y solicitud de Review:**
   ```bash
   git push origin feature/api-gestion-perfiles
   ```
   Abrir Pull Request en GitHub hacia `main`.

## Criterios de Aceptación
1. Endpoint GET de perfil retorna un objeto anidado consistente (Datos públicos del usuario + Lista de códigos de curso). No expone hashes de contraseña bajo ninguna circunstancia.
2. Endpoint POST valida correctitud de token y maneja errores de duplicidad SQL de manera limpia (evita crashes del servidor Node.js devolviendo mensajes de error en JSON estructurado).
3. El catálogo oficial de cursos persiste en MySQL y el endpoint GET `/api/cursos` retorna exitosamente todos los registros.
