var express = require('express');
var router = express.Router();
const clg = require('../tools/clg');

const controllerCliente = require('../controllers/controllerCliente');
const controllerEmpleado = require('../controllers/controllerEmpleado');

//#################### MIDDLEWARE ######################

router.use(async (req, res, next) => {

    await clg.info('Verificación de logueo');

    if (!req.session.user) {

        await clg.info('No está logueado');
        
        return next();

    };

    await clg.info('Ya está logueado. Redirección a solicitudes');
    await clg.objeto(req.session.user, 'Usuario logueado');
    return res.redirect('/');

});

//#######################################################
//################## FORM LOGIN #########################

router.get('/', async (req, res) => {

    await clg.info('Ingreso a handler para GET - /login');

    res.render('login/login.pug', {
        title: "Ingresar"
    });

});

//#######################################################
//################## FORM SIGN UP #######################

router.get('/signup', async (req, res) => {

    await clg.info('Ingreso a handler para GET - /signup');
    
    return res.render('login/signup', {
        title: "Registrarse"
    });

});

//#######################################################
//################## POST LOGIN #########################

router.post('/', (req, res) => {

    const type = req.body.type;

    if (type == 'cliente') {
        return controllerCliente.login(req, res);
    } else if (type == 'empleado') {
        return controllerEmpleado.login(req, res);
    } else {
        return res.json({msg: "dejá de tocarme el código en el cliente, pa"});
    }
    
});

//#######################################################
//############### POST SIGN UP CLIENTE ##################

router.post('/signup', controllerCliente.crear);

//###################### EXPORT #########################
module.exports = router;