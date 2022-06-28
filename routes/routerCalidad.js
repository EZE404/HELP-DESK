var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerEmpleado');
const controllerNotificacion = require('../controllers/controllerNotificacion');
const controllerArea = require('../controllers/controllerArea');


//########## MIDDLEWARE DE AUTORIZACIÓN ##########
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  if (req.session.user.type == "empleado") {
    const areaId = req.session.user.AreaId;
    if (areaId == 2) {
      return next();
    }
  }

  return res.redirect('/');
})
//---------- MIDDLEWARE DE AUTORIZACIÓN ----------

// TRAER TODOS LOS EMPLEADOS
//router.get('/', controller.todos);

router.get('/notificaciones', (req, res) => res.redirect('/calidad'))

router.get('/', async (req, res) => {
  try {

    const area = await controllerArea.getById(req.session.user.AreaId);
    const notificaciones = await controllerNotificacion.getAll();

    if (notificaciones instanceof Error) {
      throw notificaciones;
    }

    return res.render('calidad/index', {
      title: "Notificaciones",
      user: req.session.user,
      area,
      notificaciones
    })
    
  } catch (error) {
    return res.json(error);
  }
})

router.get('/notificaciones/:id', async (req, res) => {
  try {
    const noti = await controllerNotificacion.getById(req.params.id);

    await console.log("#### NOTIFICACION ####");
    await console.log(noti);
    if (noti instanceof Error) {
      throw noti;
    }

    return res.render('calidad/notificacion', {
      title: "Detalles de notificación",
      user: req.session.user,
      noti
    })
  } catch (error) {
    return res.json(error);
  }
})

router.get('/notificaciones/:id/seen', async (req, res) => {
  try {
    const noti = await controllerNotificacion.getById(req.params.id);
    const updateNoti = await controllerNotificacion.updateSeen(req.params.id, !noti.vista);

    return res.redirect('/calidad/notificaciones/'+req.params.id);

  } catch (error) {
    return res.json(error)
  }
})

//router.post('/crear', controller.create);

module.exports = router;