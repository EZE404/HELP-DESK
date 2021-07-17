var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerArea');

// TRAER TODAS LAS AREAS (NO INCLUYE EMPLEADOS ANIDADOS)
router.get('/', controller.todos);

// TRAER UN ÁREA POR ID CON EMPLEADOS ANIDADOS
router.get('/:id', controller.area);

// CREAR UN ÁREA
router.post('/crear', controller.crear);

// EDITAR UN ÁREA
router.post('/editar', controller.editar);

module.exports = router;