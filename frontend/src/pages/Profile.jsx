import React from 'react';
import '../styles/auth.css';

export default function Profile() {
  const user = {
    nombres: 'Steven Jorge Luis',
    apellidos: 'Aguilar Pacheco',
    cui: '202600000',
    email: 'estudiante@ingenieria.usac.edu.gt'
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Perfil del Estudiante</h2>
        <div className="profile-detail">
          <strong>Nombre Completo:</strong> {user.nombres} {user.apellidos}
        </div>
        <div className="profile-detail">
          <strong>CUI / Registro Académico:</strong> {user.cui}
        </div>
        <div className="profile-detail">
          <strong>Correo Electrónico:</strong> {user.email}
        </div>
      </div>
    </div>
  );
}