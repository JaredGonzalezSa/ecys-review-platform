import { useEffect, useState } from 'react';
import api from '../services/api';
import cursosLocales from '../data/cursos.json';
import './Filters.css';

function obtenerValoresUnicos(arreglo, propiedad) {
  const valores = arreglo.map((item) => item[propiedad]).filter(Boolean);
  return Array.from(new Set(valores)).sort((a, b) => a.localeCompare(b, 'es'));
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
  const [profesores, setProfesores] = useState([]);
  const [curso, setCurso] = useState('');
  const [catedratico, setCatedratico] = useState('');

  useEffect(() => {
    let activo = true;

    async function cargarCursos() {
      try {
        const respuesta = await api.get('/api/cursos');
        const datos = respuesta.data?.data ?? respuesta.data ?? [];
        
        // Estandarizar nombre_curso
        const datosLimpios = datos.map(c => ({ ...c, nombre_curso: c.nombre_curso ?? c.nombre }));
        
        const nombresCursos = obtenerValoresUnicos(datosLimpios, 'nombre_curso');
        const nombresProfesores = obtenerValoresUnicos(datosLimpios, 'profesor');

        if (activo && nombresCursos.length > 0) {
          setCursos(nombresCursos);
          setProfesores(nombresProfesores);
        } else if (activo) {
          setCursos(obtenerValoresUnicos(cursosLocales, 'nombre_curso'));
          setProfesores(obtenerValoresUnicos(cursosLocales, 'profesor'));
        }
      } catch (error) {
        console.warn('No se pudo consultar /api/cursos, usando cursos.json local.', error);
        if (activo) {
          setCursos(obtenerValoresUnicos(cursosLocales, 'nombre_curso'));
          setProfesores(obtenerValoresUnicos(cursosLocales, 'profesor'));
        }
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
        <input
          id="filtro-curso"
          list="lista-cursos-filtro"
          placeholder="Todos los cursos (escribe para buscar)"
          value={curso}
          onChange={(e) => setCurso(e.target.value)}
        />
        <datalist id="lista-cursos-filtro">
          {cursos.map((nombreCurso) => (
            <option key={nombreCurso} value={nombreCurso} />
          ))}
        </datalist>
      </div>

      <div className="filters__campo">
        <label htmlFor="filtro-catedratico">Catedrático</label>
        <input
          id="filtro-catedratico"
          list="lista-profesores-filtro"
          placeholder="Buscar por nombre de catedrático..."
          value={catedratico}
          onChange={(e) => setCatedratico(e.target.value)}
        />
        <datalist id="lista-profesores-filtro">
          {profesores.map((profesor) => (
            <option key={profesor} value={profesor} />
          ))}
        </datalist>
      </div>
    </div>
  );
}

export default Filters;
