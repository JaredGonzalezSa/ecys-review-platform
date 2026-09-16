import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/auth.css';

export default function Login() {
  const [cui, setCui] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!cui || !password) {
      setError('Por favor ingresa CUI y contraseña.');
      return;
    }

    try {
      const res = await api.post('/api/auth/login', { cui, password });
      // Guardar token en localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">INICIAR SESIÓN</h2>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="CUI / Registro Académico"
            value={cui}
            onChange={(e) => setCui(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            INGRESAR
          </button>
        </form>

        <div className="auth-links">
          <Link to="/register">¿No tienes cuenta? Regístrate aquí</Link>
          <Link to="/forgot-password">Olvidé mi contraseña</Link>
        </div>
      </div>
    </div>
  );
}
