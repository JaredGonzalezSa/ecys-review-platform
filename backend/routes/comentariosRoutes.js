const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const comentariosController = require('../controllers/comentariosController');

// Crear comentario (requiere JWT válido)
router.post('/', authMiddleware, comentariosController.crearComentario);

// Listar comentarios de una publicación (público)
// Nota: esta ruta se monta bajo /api/publicaciones en server.js, no bajo /api/comentarios
router.get('/:id/comentarios', comentariosController.obtenerComentariosPorPublicacion);

module.exports = router;