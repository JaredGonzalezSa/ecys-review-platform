const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const publicacionesController = require('../controllers/Publicacionescontroller');

// Crear publicación (requiere JWT válido)
router.post('/', authMiddleware, publicacionesController.crearPublicacion);

// Listar publicaciones (público), con filtros opcionales ?curso= y ?catedratico=
router.get('/', publicacionesController.obtenerPublicaciones);

module.exports = router;