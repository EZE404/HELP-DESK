var express = require('express');
var router = express.Router();

const controller = require('../controllers/controllerEmpleado');

//########## MIDDLEWARE DE AUTORIZACIÓN ##########
router.use((req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login')
  }
  if(req.session.user.type == "empleado") {
    if (!req.session.user.admin) {
      return next();
    }
  }

  return res.redirect('/');
})
//---------- MIDDLEWARE DE AUTORIZACIÓN ----------

// TRAER TODOS LOS EMPLEADOS
//router.get('/', controller.todos);

router.get('/', (req, res) => {
  return res.send('200', "Hola desde /empleado");
})

router.post('/crear', controller.create);

module.exports = router;