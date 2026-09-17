import React, { useState, useEffect } from 'react';
import api from '../services/api';

const CreatePost = ({ onPostCreated }) => {
  // Estado para controlar qué opción está seleccionada ('CURSO' o 'CATEDRATICO')
  const [tipoReferencia, setTipoReferencia] = useState('CURSO');
  
  // Lista de cursos traídos desde el backend
  const [cursos, setCursos] = useState([]);
  
  // Datos del formulario
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [nombreCatedratico, setNombreCatedratico] = useState('');
  const [contenido, setContenido] = useState('');
  
  // Estados para manejo de UI (mensajes y carga)
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  // useEffect para cargar los cursos solo si la opción seleccionada es 'CURSO'
  useEffect(() => {
    if (tipoReferencia === 'CURSO') {
      api.get('/api/cursos')
        .then((response) => {
          setCursos(response.data);
        })
        .catch((error) => {
          console.error('Error al obtener los cursos:', error);
        });
    }
  }, [tipoReferencia]);

  // Manejador del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación básica de longitud mínima
    if (contenido.trim().length < 10) {
      setMensaje('La reseña debe tener al menos 10 caracteres.');
      return;
    }

    // Armar el objeto según lo seleccionado para el backend
    const payload = {
      tipo_referencia: tipoReferencia,
      nombre_referencia: tipoReferencia === 'CURSO' ? cursoSeleccionado : nombreCatedratico,
      mensaje: contenido
    };

    try {
      setCargando(true);
      setMensaje('');

      // Petición POST al servidor usando la instancia centralizada
      const response = await api.post('/api/publicaciones', payload);

      if (response.status === 201 || response.status === 200) {
        setMensaje('¡Publicación creada con éxito!');
        
        // Limpiar el formulario
        setContenido('');
        setCursoSeleccionado('');
        setNombreCatedratico('');

        // Notificar a Abner (o al componente padre) para recargar publicaciones
        if (onPostCreated) {
          onPostCreated();
        }
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      setMensaje('Ocurrió un error al guardar la publicación.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '500px', margin: '20px auto' }}>
      <h2>Crear Nueva Reseña</h2>

      {mensaje && <p style={{ color: mensaje.includes('éxito') ? 'green' : 'red' }}>{mensaje}</p>}

      <form onSubmit={handleSubmit}>
        {/* Selección tipo Radio */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ marginRight: '15px' }}>
            <input
              type="radio"
              value="CURSO"
              checked={tipoReferencia === 'CURSO'}
              onChange={() => setTipoReferencia('CURSO')}
            />
            Curso
          </label>

          <label>
            <input
              type="radio"
              value="CATEDRATICO"
              checked={tipoReferencia === 'CATEDRATICO'}
              onChange={() => setTipoReferencia('CATEDRATICO')}
            />
            Catedrático
          </label>
        </div>

        {/* Renderizado Dinámico */}
        {tipoReferencia === 'CURSO' ? (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Selecciona un Curso:</label>
            <select
              value={cursoSeleccionado}
              onChange={(e) => setCursoSeleccionado(e.target.value)}
              required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">-- Selecciona un curso --</option>
              {cursos.map((curso) => (
                <option key={curso.id || curso.codigo} value={curso.id || curso.nombre}>
                  {curso.nombre}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Nombre del Catedrático:</label>
            <input
              type="text"
              value={nombreCatedratico}
              onChange={(e) => setNombreCatedratico(e.target.value)}
              placeholder="Ej. Ing. Juan Pérez"
              required
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        )}

        {/* Captura de texto */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Reseña:</label>
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            rows="4"
            placeholder="Escribe tu opinión (mínimo 10 caracteres)..."
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {cargando ? 'Publicando...' : 'Publicar Reseña'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;