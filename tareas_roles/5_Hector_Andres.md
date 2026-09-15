# Manual de Tareas: Héctor Andrés Andrés Pedro

## Rol Asignado
Desarrollador Frontend (Módulos de Creación y Participación).

## Responsabilidades y Objetivos Específicos
Tu enfoque recae sobre la interacción de escritura de la plataforma. Deberás construir las interfaces para ingresar nuevas publicaciones a la base de datos y proveer la capacidad de añadir respuestas (comentarios) a publicaciones existentes, integrándote fuertemente con el código de tus compañeros.

## Especificaciones de Desarrollo (Nivel Arquitectura)

### 1. Formulario de Creación de Publicación
- **Archivo:** `/frontend/src/components/CreatePost.jsx` (Puede renderizarse como una página separada `/create` o como un modal superior en `/home`).
- **Manejo de Estado (UI):** Implementar dos `input type="radio"` para seleccionar tipo de referencia: `CURSO` o `CATEDRATICO`.
- **Renderizado Dinámico:**
  - Si el estado es `CURSO`, renderizar un `<select>` populado con los datos de `cursos.json`.
  - Si el estado es `CATEDRATICO`, renderizar un `input type="text"`.
- **Captura de texto:** Incorporar un `<textarea>` para el cuerpo de la reseña, aplicando validaciones de longitud (mínimo de caracteres).
- **Transacción HTTP:** Al evento `onSubmit`, prevenir comportamiento default y ejecutar una petición POST mediante la instancia centralizada de Axios hacia `/api/publicaciones`, enviando el payload requerido. 
- Tras recibir el HTTP 201 Created, limpiar los estados del formulario. Si estás en la misma vista de `/home`, coordinar con Abner para disparar un re-fetch del array de publicaciones.

### 2. Módulo de Comentarios Integrado
- **Archivo:** `/frontend/src/components/CommentSection.jsx`
- **Integración:** Modificarás el archivo `PostCard.jsx` (desarrollado por Abner) importando tu componente `CommentSection` al final del return de la tarjeta. Debes pasarle el `id_publicacion` vía Props.
- **Petición Inicial:** Dentro de tu componente, usar `useEffect` para llamar a `GET /api/publicaciones/:id/comentarios`. Mostrar la lista de comentarios.
- **Formulario de Respuesta:** Debajo de la lista, colocar un `input type="text"` y un botón "Comentar". Al enviar, ejecutar `POST /api/comentarios`.
- **Optimización de UX:** Al insertar un comentario exitosamente, no recargar la página. Agregar el nuevo objeto retornado por el backend al estado local del array de comentarios inmediatamente.

## Dependencias Técnicas
- **Pre-requisitos:**
  - La tarjeta de publicación `PostCard.jsx` desarrollada por Abner debe existir en `main` para que puedas adjuntarle tu módulo.
  - Los endpoints HTTP `POST /api/publicaciones` y `POST /api/comentarios` desarrollados por Javier deben estar operando.
- **Bloqueantes:** Representas el flujo final de la característica principal de la aplicación.

## Flujo de Trabajo Git (Nivel Profesional)
Debido a que modificarás directamente archivos creados por Abner, la precisión en tu manejo de ramas es crítica para evitar sobrescrituras.

1. **Verificar rama local y actualizar:**
   ```bash
   git fetch origin
   git checkout main
   git reset --hard origin/main # Peligroso: Asegura paridad exacta con remoto, ejecuta solo si no tienes cambios locales pendientes.
   ```
2. **Creación de rama secundaria:**
   ```bash
   git checkout -b feature/forms-creacion-comentarios
   ```
3. **Registro atómico de cambios (Commiting):**
   ```bash
   git add src/components/CreatePost.jsx src/components/CommentSection.jsx
   git commit -m "feat(frontend): implementados formularios de publicacion y comentarios"
   # Cuando modifiques el archivo de Abner:
   git add src/components/PostCard.jsx
   git commit -m "refactor(frontend): acoplado modulo de comentarios a PostCard"
   ```
4. **Estrategia de Integración Continua (Rebase):**
   Si Abner hizo cambios recientes a `PostCard.jsx` en main:
   ```bash
   git fetch origin
   git rebase origin/main
   # Resolver posibles conflictos de líneas en PostCard.jsx
   git push origin feature/forms-creacion-comentarios
   ```
5. Emitir Pull Request para revisión estructural.

## Criterios de Aceptación
1. Creación de publicaciones exitosa sin refrescar el navegador.
2. Componentes de UI reaccionan dinámicamente al switch de Curso/Catedrático.
3. Comentarios se anidan jerárquicamente bajo su respectiva publicación y el conteo o visualización se actualiza en tiempo real al agregar uno nuevo.
