# Manual de Tareas: Abner Emmanuel Sotz Uracán

## Rol Asignado
Desarrollador Frontend (Sistema de Visualización de Reseñas y Filtrado de Datos).

## Responsabilidades y Objetivos Específicos
Tu enfoque principal es la experiencia de lectura del usuario (Pantalla Inicial/Feed). Debes consumir los datos del backend, mapearlos en componentes React eficientes (Tarjetas de publicación) e implementar un sistema de filtrado dinámico en la interfaz que consuma el archivo de datos JSON base y modifique las peticiones HTTP.

## Especificaciones de Desarrollo (Nivel Arquitectura)

### 1. Pantalla Principal y Listado
- **Archivo:** `/frontend/src/pages/Home.jsx`
- **Ciclo de vida:** Utilizar el hook `useEffect` para invocar a la instancia global de Axios (`/frontend/src/services/api.js`) y realizar una petición `GET` a `/api/publicaciones` tan pronto se monte el componente.
- **Gestión de Estado:** Almacenar el array de respuesta en un estado local con `useState`.
- **Renderizado:** Iterar sobre el estado empleando `.map()` e instanciar un componente hijo `PostCard.jsx` por cada índice, pasando los datos mediante *Props*.

### 2. Componente de Publicación (Card)
- **Archivo:** `/frontend/src/components/PostCard.jsx`
- **Diseño:** Maquetación limpia en CSS. Debe desplegar: Nombre completo del autor, distintivo visual de si es "Catedrático" o "Curso", nombre del catedrático/curso, contenido del mensaje y la fecha formateada (ej. `DD/MM/YYYY`).
- **Escalabilidad:** Estructurar el DOM de la tarjeta dejando un espacio inferior vacío. Esto es deliberado porque Héctor insertará en ese contenedor el módulo de Comentarios.

### 3. Sistema de Filtros Avanzado
- **Archivo:** `/frontend/src/components/Filters.jsx` (Importado dentro de `Home.jsx`).
- **Estructura:** Barra de herramientas superior con dos mecanismos de filtrado mutuamente excluyentes o complementarios.
- **Filtro por Curso:**
  - Consumir el endpoint `GET /api/cursos` creado por Elman al cargar el componente (usando un `useEffect` adicional).
  - Iterar el array resultante y generar etiquetas `<option>` dentro de un `<select>`. Esto garantiza que los nombres enviados al backend sean 100% exactos y provengan de la base de datos central.
- **Filtro por Catedrático:** Input de tipo `text`.
- **Mecanismo de acción:** Al cambiar el valor de un filtro, actualizar un estado y disparar nuevamente la petición Axios adjuntando *Query Params* (ej. `axios.get('/api/publicaciones?curso=Mate2')`).

## Dependencias Técnicas
- **Pre-requisitos:**
  - Configuración inicial de Frontend y React Router completada por Carlos.
  - La API de `GET /api/publicaciones` debe estar desplegada por Javier (si no está terminada, debes desarrollar la UI utilizando un array JSON falso/Mock en el cliente temporalmente).
- **Bloqueantes:** Héctor depende estructuralmente del componente `PostCard.jsx` para anidar sus funciones.

## Flujo de Trabajo Git (Nivel Profesional)
Deberás integrar tu trabajo en un entorno donde posiblemente Steven ya modificó el Frontend. 

1. **Garantizar base actualizada antes de crear rama:**
   ```bash
   git fetch origin
   git checkout main
   git merge origin/main
   git checkout -b feature/feed-y-filtros
   ```
2. **Generación de código:**
   ```bash
   git add src/pages/Home.jsx src/components/PostCard.jsx
   git commit -m "feat(frontend): implementacion de grid de publicaciones y consumos HTTP"
   ```
3. **Resolución preventiva de conflictos antes de Pull Request:**
   ```bash
   git checkout main
   git pull origin main
   git checkout feature/feed-y-filtros
   git merge main 
   ```
   *(Si Steven modificó `App.jsx` para agregar las rutas de login, asegúrate de no sobrescribir sus rutas al hacer merge. Resuelve los conflictos en VS Code aceptando ambas modificaciones)*.
4. **Despliegue a remoto:**
   ```bash
   git push origin feature/feed-y-filtros
   ```

## Criterios de Aceptación
1. Renderizado condicional implementado: Mostrar un *Loader* o indicador de carga mientras Axios espera respuesta. Mostrar "No hay resultados" si el array retorna vacío.
2. Las opciones del `<select>` de cursos se pueblan dinámicamente desde el archivo `cursos.json`.
3. Filtrado reactivo: Las llamadas de red contienen los parámetros exactos y actualizan la vista sin necesidad de refrescar el navegador (F5).
