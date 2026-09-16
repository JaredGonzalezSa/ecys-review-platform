const db = require('../config/db');

// Obtener perfil de un estudiante
exports.obtenerPerfil = async (req, res) => {
  try {
    const { cui } = req.params;

    // Buscar únicamente los datos públicos del usuario.
    // password_hash NO se incluye en la consulta.
    const [usuarios] = await db.query(
      `SELECT cui, nombres, apellidos, email
       FROM usuarios
       WHERE cui = ?`,
      [cui]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({
        message: 'Usuario no encontrado'
      });
    }

    const usuario = usuarios[0];

    // Obtener los cursos aprobados asociados al usuario
    const [cursos] = await db.query(
      `SELECT id_curso
       FROM cursos_aprobados
       WHERE cui_usuario = ?`,
      [cui]
    );

    const cursosAprobados = cursos.map(curso => curso.id_curso);

    // Construir respuesta del perfil
    res.json({
      cui: usuario.cui,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      email: usuario.email,
      cursos_aprobados: cursosAprobados
    });

  } catch (error) {
    console.error('Error al obtener perfil:', error);

    res.status(500).json({
      message: 'Error en el servidor al obtener el perfil'
    });
  }
};