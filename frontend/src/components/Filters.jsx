import { useEffect, useState } from 'react';
import api from '../services/api';
import cursosLocales from '../data/cursos.json';
import './Filters.css';

/**
 * Extrae un nombre de curso "limpio" desde el catálogo local `cursos.json`,
 * evitando nombres duplicados en el <select>.
 */
function obtenerNombresUnicos(cursos) {
  const nombres = cursos.map((curso) => curso.nombre_curso ?? curso.nombre).filter(Boolean);
  return Array.from(new Set(nombres)).sort((a, b) => a.localeCompare(b, 'es'));
}

/**
 * Barra de filtros del Feed.
 * - Filtro por Curso: <select> poblado dinámicamente desde GET /api/cursos
 *   (endpoint de Elman). Si el endpoint aún no está disponible se recurre al
 *   catálogo local `cursos.json` para no bloquear el desarrollo de la UI.
 * - Filtro por Catedrático: input de texto libre.
 *
 * Notifica al padre (Home.jsx) mediante `onFiltrosChange({ curso, catedratico })`.
 */
function Filters({ onFiltrosChange }) {
  const [cursos, setCursos] = useState([]);
  const [curso, setCurso] = useState('');
  const [catedratico, setCatedratico] = useState('');

  useEffect(() => {
    let activo = true;

    async function cargarCursos() {
      try {
        const respuesta = await api.get('/api/cursos');
        const datos = respuesta.data?.data ?? respuesta.data ?? [];
        const nombres = obtenerNombresUnicos(
          datos.map((c) => ({ nombre_curso: c.nombre ?? c.nombre_curso }))
        );

        if (activo && nombres.length > 0) {
          setCursos(nombres);
        } else if (activo) {
          setCursos(obtenerNombresUnicos(cursosLocales));
        }
      } catch (error) {
        // GET /api/cursos todavía no está desplegado por Elman: se usa el
        // catálogo local como respaldo temporal.
        console.warn('No se pudo consultar /api/cursos, usando cursos.json local.', error);
        if (activo) setCursos(obtenerNombresUnicos(cursosLocales));
      }
    }

    cargarCursos();
    return () => {
      activo = false;
    };
  }, []);

  // Dispara el filtrado reactivo cada vez que cambia curso o catedrático.
  useEffect(() => {
    onFiltrosChange({ curso, catedratico });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curso, catedratico]);

  return (
    <div className="filters">
      <div className="filters__campo">
        <label htmlFor="filtro-curso">Curso</label>
        <select
          id="filtro-curso"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        >
          <option value="">Todos los cursos</option>
          {cursos.map((nombreCurso) => (
            <option key={nombreCurso} value={nombreCurso}>
              {nombreCurso}
            </option>
          ))}
        </select>
      </div>

      <div className="filters__campo">
        <label htmlFor="filtro-catedratico">Catedrático</label>
        <input
          id="filtro-catedratico"
          type="text"
          placeholder="Buscar por nombre de catedrático..."
          value={catedratico}
          onChange={(e) => setCatedratico(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
