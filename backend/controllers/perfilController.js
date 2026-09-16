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

// Agregar un curso aprobado al perfil del usuario
exports.agregarCursoAprobado = async (req, res) => {
  try {
    const cui = req.user.cui;
    const { id_curso } = req.body;

    // Validar que se haya enviado el id del curso
    if (!id_curso) {
      return res.status(400).json({
        message: 'El id_curso es obligatorio'
      });
    }

    // Verificar que el curso exista
    const [cursos] = await db.query(
      `SELECT id
       FROM cursos
       WHERE id = ?`,
      [id_curso]
    );

    if (cursos.length === 0) {
      return res.status(404).json({
        message: 'Curso no encontrado'
      });
    }

    // Registrar el curso aprobado
    await db.query(
      `INSERT INTO cursos_aprobados (cui_usuario, id_curso)
       VALUES (?, ?)`,
      [cui, id_curso]
    );

    res.status(201).json({
      message: 'Curso aprobado agregado correctamente'
    });

  } catch (error) {
    // Error por curso ya registrado
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        message: 'El curso ya está registrado como aprobado'
      });
    }

    console.error('Error al agregar curso aprobado:', error);

    res.status(500).json({
      message: 'Error en el servidor al agregar curso aprobado'
    });
  }
};


// Eliminar un curso aprobado del perfil del usuario
exports.eliminarCursoAprobado = async (req, res) => {
  try {
    const cui = req.user.cui;
    const { id_curso } = req.params;

    const [resultado] = await db.query(
      `DELETE FROM cursos_aprobados
       WHERE cui_usuario = ? AND id_curso = ?`,
      [cui, id_curso]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        message: 'El curso aprobado no está registrado'
      });
    }

    res.json({
      message: 'Curso aprobado eliminado correctamente'
    });

  } catch (error) {
    console.error('Error al eliminar curso aprobado:', error);

    res.status(500).json({
      message: 'Error en el servidor al eliminar curso aprobado'
    });
  }
};