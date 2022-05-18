var express = require('express');
var router = express.Router();
const clg = require('../tools/clg');

//########## MIDDLEWARE DE AUTORIZACIÓN ##########
router.use((req, res, next) => {
  if(req.session.type == "empleado") {
    if (req.session.user.admin) {
      return next();
    }
  }

  return res.redirect('/');
})
//---------- MIDDLEWARE DE AUTORIZACIÓN ----------

router.get('/', (req, res) => {
  // ACÁ DEBERÍA RENDERIZAR SOLO LOS BOTONES AREAS, EMPLEADOS Y CLIENTES

  return res.render('admin/index', {title: "Administrador", type:"admin", user:req.session.user});

  //return res.send('200', "Hola desde /admin")
})


module.exports = router;