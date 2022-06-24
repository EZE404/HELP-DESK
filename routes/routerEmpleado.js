var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerEmpleado');
const controllerSolicitud = require('../controllers/controllerSolicitud');
const controllerHistorial = require('../controllers/controllerHistorial');
const controllerArea = require('../controllers/controllerArea');



//########## MIDDLEWARE DE AUTORIZACIÓN ##########
router.use((req, res, next) => {
  console.log("entró al middleware de routerEmpleado");
  if (!req.session.user) {
    return res.redirect('/login')
  }

  if(req.session.user.type == "empleado") {
    console.log("Entró al condicional si es empleado en middleware routerEmpleado");
    const areaId = req.session.user.AreaId;
    if (areaId != 3 && areaId != 2) {
      console.log("Es empleado de helpdesk u otro");
      return next();
    }
  }

  return res.redirect('/');
})
//---------- MIDDLEWARE DE AUTORIZACIÓN ----------

// TRAER TODOS LOS EMPLEADOS
//router.get('/', controller.todos);

router.get('/', async (req, res) => {

  try {
    const area = await controllerArea.getById(req.session.user.AreaId);
    const historials = await controllerHistorial.getAllBySessionAreaId(req.session.user.AreaId);
/*     if (historials instanceof Error) {
      return res.send("Ocurrió un error");
    } */

    console.log("intentando fetchear historiales en routerEmpleado");
    res.render('empleado/solicitudes', {
      title: "Solicitudes",
      user: req.session.user,
      historials,
      area
    })
  } catch (error) {
    return res.json(error);
  }
})

router.get('/solicitud/:id', async (req, res) => {
  //if(req.params.id) {return res.send(req.params.id)}
  try {
    const solicitud = await controllerSolicitud.getById(req.params.id);
    console.log(solicitud)
    return res.render('empleado/solicitud', {
    title: "Detalles de solicitud",
    user: req.session.user,
    solicitud
  })
  } catch (error) {
    return res.json(error);
  }

})

module.exports = router;