var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerLogin');

//############# MIDDLEWARE ##############
router.use(controller.validarLoginInv);

//############# ROUTES ##################

// FORMULARIO DE LOGIN
router.get('/', controller.formLogin);



// FORMULARIO PARA REGISTRARSE
router.get('/signup', controller.formSignup)

// POST DEL LOGIN
router.post('/', (req, res) => {
    const type = req.body.type;
    if (type == 'cliente') {
        return controller.loginCliente(req, res);
    } else if (type == 'empleado') {
        return controller.loginEmpleado(req, res);
    } else {
        return res.json({msg: "dejá de tocarme el código en el cliente, pa"});
    }
});

//router.post('/', controller.login)

// POST DEL REGISTRO
router.post('/signup', require('../controllers/controllerCliente').crear);


module.exports = router;