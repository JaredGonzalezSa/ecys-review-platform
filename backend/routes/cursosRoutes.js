const express = require('express');
const router = express.Router();

const cursosController = require('../controllers/cursosController');

// GET /api/cursos
router.get('/', cursosController.obtenerCursos);

module.exports = router;