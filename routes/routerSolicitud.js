var express = require("express");
var router = express.Router();

const controller = require("../controllers/controllerSolicitud");

// TRAER TODAS LAS SOLICITUDES
//router.get('/', controller.todos)

// TRAER TODOS LAS SOLICITUDES X CLIENTE (HAY QUE CAMBIAR POST A GET Y USAR /:ID)
router.post("/", controller.todo);

// CREAR SOLICITUD
router.post("/crear", controller.crear);

module.exports = router;
