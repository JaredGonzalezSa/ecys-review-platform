const db = require('../config/db');

// Obtener todos los cursos
exports.obtenerCursos = async (req, res) => {
  try {
    const [cursos] = await db.query(
      `SELECT id, nombre_curso, profesor
       FROM cursos
       ORDER BY id`
    );

    res.json(cursos);

  } catch (error) {
    console.error('Error al obtener cursos:', error);

    res.status(500).json({
      message: 'Error en el servidor al obtener los cursos'
    });
  }
};