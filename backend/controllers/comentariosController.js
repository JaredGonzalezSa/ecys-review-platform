const pool = require('../config/db');

// POST /api/comentarios
exports.crearComentario = async (req, res) => {
  try {
    const { id_publicacion, mensaje } = req.body;

    if (!id_publicacion || !mensaje) {
      return res.status(400).json({
        success: false,
        message: 'id_publicacion y mensaje son obligatorios',
      });
    }

    // Verificamos que la publicación exista antes de comentar
    const [publicaciones] = await pool.query(
      `SELECT id_publicacion FROM publicaciones WHERE id_publicacion = ?`,
      [id_publicacion]
    );

    if (publicaciones.length === 0) {
      return res.status(404).json({ success: false, message: 'La publicación no existe' });
    }

    // req.user viene del authMiddleware (JWT ya validado)
    const cui_usuario = req.user.cui;

    const [result] = await pool.query(
      `INSERT INTO comentarios (id_publicacion, cui_usuario, mensaje)
       VALUES (?, ?, ?)`,
      [id_publicacion, cui_usuario, mensaje]
    );

    res.status(201).json({
      success: true,
      data: {
        id_comentario: result.insertId,
        id_publicacion,
        cui_usuario,
        mensaje,
      },
    });
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ success: false, message: 'Error interno al crear el comentario' });
  }
};

// GET /api/publicaciones/:id/comentarios
exports.obtenerComentariosPorPublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `SELECT
        c.id_comentario,
        c.id_publicacion,
        c.cui_usuario,
        c.mensaje,
        c.fecha_creacion,
        u.nombre,
        u.apellido
      FROM comentarios c
      JOIN usuarios u ON c.cui_usuario = u.cui
      WHERE c.id_publicacion = ?
      ORDER BY c.fecha_creacion ASC`,
      [id]
    );

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error al obtener comentarios:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener los comentarios' });
  }
};