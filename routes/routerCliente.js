var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerCliente');
const controllerSolicitud = require('../controllers/controllerSolicitud');


//########## MIDDLEWARE DE AUTORIZACIÓN ##########
router.use((req, res, next) => {

  if (!req.session.user) {
    return res.redirect('/login')
  }
  if (req.session.user.type == "cliente") {
    return next();
  }

  return res.redirect('/');
})
//---------- MIDDLEWARE DE AUTORIZACIÓN ----------


router.get('/', async (req, res) => {
  // Acá debería responder una tabla con las solicituds por id de cliente

  //traerme un arreglo/objeto desde controllerSolicitud
  const solicitudes = await controllerSolicitud.getAllByClienteId(req.session.user.id);
  // renderizar vista con solicitudes
  return res.render('cliente/index', {
    title:"Mis solicitudes",
    type:"cliente",
    user:req.session.user,
    solicitudes});
})

router.get('/tracking/:uuid', async (req, res) => {

  const solicitud = await controllerSolicitud.getSolicitudByUuid(req.params.uuid)

  return res.render('cliente/tracking', {
    title: "Detalles de solicitud",
    type:"cliente",
    user: req.session.user,
    solicitud})
})

router.get('/solicitud', (req, res) => {
  res.render('cliente/formSolicitud', {
    title: "Nueva solicitud",
    type: "cliente",
    user: req.session.user,
  })
})

router.post('/solicitud', async (req, res) => {
  const form = req.body;
  form.userId = req.session.user.id;

  const result = await controllerSolicitud.crear(form);
  if(result) {
    return res.redirect('/cliente');
  } else if(result == 0){
    return res.send('500', "Algo no anduvo bien al cargartu solicitud");
  } else {
    return res.send(result);
  }
})

module.exports = router;
