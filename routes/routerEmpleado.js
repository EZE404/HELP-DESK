var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerEmpleado');

// TRAER TODOS LOS EMPLEADOS
router.get('/', controller.todos);

router.post('/crear', controller.crear);

module.exports = router;