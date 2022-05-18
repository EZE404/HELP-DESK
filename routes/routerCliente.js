var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerCliente');
const controllerSolicitud = require('../controllers/controllerSolicitud');


//########## MIDDLEWARE DE AUTORIZACIÓN ##########
router.use((req, res, next) => {
  if (req.session.type == "cliente") {
    return next();
  }

  return res.redirect('/');
})
//---------- MIDDLEWARE DE AUTORIZACIÓN ----------

// TRAE TODOS LOS CLIENTES
//router.get('/', controller.todos);

router.get('/', async (req, res) => {
  // Acá debería responder una tabla con las solicituds por id de cliente

  //traerme un arreglo/objeto desde controllerSolicitud
  const solicitudes = await controllerSolicitud.getByClienteId(req.session.user.id);
  // renderizar vista con solicitudes
  return res.render('cliente/index', {title:"Mis solicitudes", type:"cliente", user:req.session.user, solicitudes});
})

// CREAR EMPLEADO
router.post('/crear', controller.crear);

module.exports = router;
