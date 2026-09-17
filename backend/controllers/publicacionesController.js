const pool = require('../config/db');

// POST /api/publicaciones
exports.crearPublicacion = async (req, res) => {
  try {
    const { tipo_referencia, nombre_referencia, mensaje } = req.body;

    if (!tipo_referencia || !nombre_referencia || !mensaje) {
      return res.status(400).json({
        success: false,
        message: 'tipo_referencia, nombre_referencia y mensaje son obligatorios',
      });
    }

    if (!['CURSO', 'CATEDRATICO'].includes(tipo_referencia)) {
      return res.status(400).json({
        success: false,
        message: "tipo_referencia debe ser 'CURSO' o 'CATEDRATICO'",
      });
    }

    // req.user viene del authMiddleware (JWT ya validado)
    const cui_usuario = req.user.cui;

    const [result] = await pool.query(
      `INSERT INTO publicaciones (cui_usuario, tipo_referencia, nombre_referencia, mensaje)
       VALUES (?, ?, ?, ?)`,
      [cui_usuario, tipo_referencia, nombre_referencia, mensaje]
    );

    res.status(201).json({
      success: true,
      data: {
        id_publicacion: result.insertId,
        cui_usuario,
        tipo_referencia,
        nombre_referencia,
        mensaje,
      },
    });
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ success: false, message: 'Error interno al crear la publicación' });
  }
};

// GET /api/publicaciones?curso=...&catedratico=...
exports.obtenerPublicaciones = async (req, res) => {
  try {
    const { curso, catedratico } = req.query;

    let sql = `
      SELECT
        p.id_publicacion,
        p.cui_usuario,
        p.tipo_referencia,
        p.nombre_referencia,
        p.mensaje,
        p.fecha_creacion,
        u.nombres,
        u.apellidos
      FROM publicaciones p
      JOIN usuarios u ON p.cui_usuario = u.cui
      WHERE 1 = 1
    `;
    const params = [];

    if (curso) {
      sql += ` AND p.tipo_referencia = 'CURSO' AND p.nombre_referencia LIKE ?`;
      params.push(`%${curso}%`);
    }

    if (catedratico) {
      sql += ` AND p.tipo_referencia = 'CATEDRATICO' AND p.nombre_referencia LIKE ?`;
      params.push(`%${catedratico}%`);
    }

    sql += ` ORDER BY p.fecha_creacion DESC`;

    const [rows] = await pool.query(sql, params);

    res.json({ success: true, data: rows });
  } catch (error) {
    console.error('Error al obtener publicaciones:', error);
    res.status(500).json({ success: false, message: 'Error interno al obtener las publicaciones' });
  }
};