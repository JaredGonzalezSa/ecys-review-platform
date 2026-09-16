const express = require('express');
const router = express.Router();

const perfilController = require('../controllers/perfilController');
const authMiddleware = require('../middlewares/authMiddleware');

// GET /api/perfiles/:cui
router.get('/:cui', perfilController.obtenerPerfil);

// POST /api/perfiles/cursos-aprobados
router.post(
  '/cursos-aprobados',
  authMiddleware,
  perfilController.agregarCursoAprobado
);

// DELETE /api/perfiles/cursos-aprobados/:id_curso
router.delete(
  '/cursos-aprobados/:id_curso',
  authMiddleware,
  perfilController.eliminarCursoAprobado
);

module.exports = router;