import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentSection = ({ id_publicacion }) => {
  // Estado para la lista de comentarios
  const [comentarios, setComentarios] = useState([]);
  
  // Estado para el texto del nuevo comentario
  const [nuevoComentario, setNuevoComentario] = useState('');
  
  // Estados de interfaz
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');

  // Cargar comentarios al montar el componente o si cambia el ID de la publicación
  useEffect(() => {
    if (id_publicacion) {
      axios.get(`/api/publicaciones/${id_publicacion}/comentarios`)
        .then((response) => {
          setComentarios(response.data);
        })
        .catch((err) => {
          console.error('Error al obtener comentarios:', err);
        });
    }
  }, [id_publicacion]);

  // Manejar el envío de un nuevo comentario
  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!nuevoComentario.trim()) return;

    const payload = {
      id_publicacion: id_publicacion,
      texto: nuevoComentario
    };

    try {
      setCargando(true);
      setError('');

      // Enviar el comentario al backend
      const response = await axios.post('/api/comentarios', payload);

      if (response.status === 201 || response.status === 200) {
        // Optimización UX: agregar el comentario devuelto directamente al estado local
        const comentarioCreado = response.data.comentario || response.data;
        setComentarios((prev) => [...prev, comentarioCreado]);

        // Limpiar la caja de texto
        setNuevoComentario('');
      }
    } catch (err) {
      console.error('Error al enviar comentario:', err);
      setError('No se pudo enviar el comentario. Intenta nuevamente.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ marginTop: '15px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
      <h4>Comentarios</h4>

      {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

      {/* Lista de comentarios existentes */}
      <div style={{ marginBottom: '15px', maxHeight: '200px', overflowY: 'auto' }}>
        {comentarios.length === 0 ? (
          <p style={{ fontStyle: 'italic', color: '#666', fontSize: '14px' }}>
            Aún no hay comentarios. ¡Sé el primero!
          </p>
        ) : (
          comentarios.map((c, index) => (
            <div key={c.id || index} style={{ background: '#f9f9f9', padding: '8px', borderRadius: '4px', marginBottom: '6px' }}>
              <p style={{ margin: 0, fontSize: '14px' }}>{c.texto || c.contenido}</p>
            </div>
          ))
        )}
      </div>

      {/* Formulario de Respuesta */}
      <form onSubmit={handleSubmitComment} style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={nuevoComentario}
          onChange={(e) => setNuevoComentario(e.target.value)}
          placeholder="Escribe un comentario..."
          required
          style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button
          type="submit"
          disabled={cargando}
          style={{ padding: '8px 16px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {cargando ? 'Enviando...' : 'Comentar'}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;