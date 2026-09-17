import React, { useState } from 'react';
import CommentSection from './CommentSection';
import './PostCard.css';

function PostCard({ publicacion }) {
  const [mostrarComentarios, setMostrarComentarios] = useState(false);

  const formatearFecha = (fechaString) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(fechaString).toLocaleDateString('es-ES', opciones);
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-autor">
          <div className="avatar">
            {publicacion.nombres ? publicacion.nombres.charAt(0) : 'U'}
          </div>
          <div>
            <h4>{publicacion.nombres} {publicacion.apellidos}</h4>
            <span className="post-fecha">{formatearFecha(publicacion.fecha_creacion)}</span>
          </div>
        </div>
        <span className={`badge badge-${publicacion.tipo_referencia.toLowerCase()}`}>
          {publicacion.tipo_referencia}
        </span>
      </div>

      <div className="post-content">
        <h3 className="referencia-titulo">{publicacion.nombre_referencia}</h3>
        <p className="post-mensaje">{publicacion.mensaje}</p>
      </div>

      <div className="post-footer">
        <button 
          className="btn-comentarios"
          onClick={() => setMostrarComentarios(!mostrarComentarios)}
        >
          {mostrarComentarios ? 'Ocultar Comentarios' : 'Ver Comentarios'}
        </button>
      </div>

      {mostrarComentarios && (
        <div className="post-comentarios-section">
          <CommentSection id_publicacion={publicacion.id_publicacion} />
        </div>
      )}
    </div>
  );
}

export default PostCard;
