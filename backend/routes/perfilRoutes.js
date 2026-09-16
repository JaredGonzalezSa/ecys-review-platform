const express = require('express');
const router = express.Router();

const perfilController = require('../controllers/perfilController');

// GET /api/perfiles/:cui
router.get('/:cui', perfilController.obtenerPerfil);

module.exports = router;