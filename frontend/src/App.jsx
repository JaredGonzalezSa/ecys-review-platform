import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Rutas de Steven (Pendientes de implementar) */}
          <Route path="/login" element={<h2>Login (En construcción)</h2>} />
          <Route path="/register" element={<h2>Registro (En construcción)</h2>} />
          
          {/* Rutas de Abner (Pendientes de implementar) */}
          <Route path="/home" element={<h2>Home / Feed de Reseñas (En construcción)</h2>} />

          {/* Redirección por defecto */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
