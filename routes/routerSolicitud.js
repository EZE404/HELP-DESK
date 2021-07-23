var express = require("express");
var router = express.Router();

const controller = require("../controllers/controllerSolicitud");

//############# VERIFICAR LOGUEO ##################
router.use((req, res, next) => {
    if (req.session.user) {
        return next();
    }

    return res.redirect('/login');
})
//#################################################

// FORM CARGAR SOLICITUD
router.get('/crear', controller.form);


// TRAER TODAS LAS SOLICITUDES
//router.get('/', controller.todos)

// TRAER TODOS LAS SOLICITUDES X CLIENTE (HAY QUE CAMBIAR POST A GET Y USAR /:ID)
router.post("/", controller.todo);

// CREAR SOLICITUD
router.post("/crear", controller.crear);

// GET SOLICITUD
router.get('/:uuid', controller.getSolicitudByUuid);
module.exports = router;
