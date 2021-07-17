var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerCliente');

// TRAE TODOS LOS CLIENTES
router.get('/', controller.todos);

// CREAR EMPLEADO
router.post('/crear', controller.crear);

module.exports = router;
