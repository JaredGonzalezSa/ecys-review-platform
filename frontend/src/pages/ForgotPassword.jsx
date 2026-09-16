import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/auth.css';

export default function ForgotPassword() {
  const [cui, setCui] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!cui || !email) {
      setMessage({ type: 'error', text: 'Todos los campos son obligatorios.' });
      return;
    }

    try {
      const res = await api.post('/api/auth/reset-password', { cui, email });
      setMessage({ type: 'success', text: res.data.message || 'Instrucciones enviadas.' });
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: err.response?.data?.message || 'Datos incorrectos o no coinciden.' 
      });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">RECUPERAR CONTRASEÑA</h2>

        {message.text && (
          <div className={message.type === 'error' ? 'error-banner' : 'success-banner'}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            placeholder="CUI / Registro Académico"
            value={cui}
            onChange={(e) => setCui(e.target.value)}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Correo Electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            RESTABLECER CONTRASEÑA
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">Volver al inicio de sesión</Link>
        </div>
      </div>
    </div>
  );
}