import React, { useState, useEffect } from 'react';
import api from '../services/api';
import Filters from '../components/Filters';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import './Home.css';

function Home() {
  const [publicaciones, setPublicaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState({ curso: '', catedratico: '' });
  const [mostrarCrearResena, setMostrarCrearResena] = useState(false);

  const cargarPublicaciones = async () => {
    setCargando(true);
    try {
      const { curso, catedratico } = filtros;
      let query = '';
      if (curso) query += `?curso=${encodeURIComponent(curso)}`;
      if (catedratico) query += (query ? '&' : '?') + `catedratico=${encodeURIComponent(catedratico)}`;
      
      const respuesta = await api.get(`/api/publicaciones${query}`);
      setPublicaciones(respuesta.data.data || respuesta.data);
    } catch (error) {
      console.error('Error al cargar publicaciones:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarPublicaciones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Feed de Reseñas</h1>
        <button 
          className="btn-crear" 
          onClick={() => setMostrarCrearResena(!mostrarCrearResena)}
        >
          {mostrarCrearResena ? 'Ocultar Formulario' : '+ Nueva Reseña'}
        </button>
      </header>

      {mostrarCrearResena && (
        <div className="crear-resena-wrapper">
          <CreatePost onPostCreated={cargarPublicaciones} />
        </div>
      )}

      <div className="filtros-wrapper">
        <Filters onFiltrosChange={setFiltros} />
      </div>

      <main className="feed-main">
        {cargando ? (
          <p className="cargando-texto">Cargando reseñas...</p>
        ) : publicaciones.length === 0 ? (
          <p className="vacio-texto">No se encontraron reseñas con los filtros actuales.</p>
        ) : (
          <div className="publicaciones-grid">
            {publicaciones.map(pub => (
              <PostCard key={pub.id_publicacion} publicacion={pub} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default Home;
