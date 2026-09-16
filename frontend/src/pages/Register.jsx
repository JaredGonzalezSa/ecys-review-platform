import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import '../styles/auth.css';

export default function Register() {
  const [formData, setFormData] = useState({
    cui: '',
    nombres: '',
    apellidos: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const { cui, nombres, apellidos, email, password } = formData;

    if (!cui || !nombres || !apellidos || !email || !password) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!/^\d+$/.test(cui)) {
      setError('El CUI debe contener únicamente números.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Ingrese un formato de correo electrónico válido.');
      return;
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      await api.post('/api/auth/register', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrar el usuario.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">REGISTRO DE USUARIO</h2>

        {error && <div className="error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="text"
            name="cui"
            placeholder="CUI / Registro Académico"
            value={formData.cui}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="text"
            name="nombres"
            placeholder="Nombres"
            value={formData.nombres}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="text"
            name="apellidos"
            placeholder="Apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo Electrónico"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña (mín. 8 caracteres)"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            REGISTRARSE
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">¿Ya tienes cuenta? Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
}