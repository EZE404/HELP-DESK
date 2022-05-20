var express = require('express');
var router = express.Router();
const controllerCliente = require('../controllers/controllerCliente');
const controllerEmpleado = require('../controllers/controllerEmpleado');


router.use((req, res, next) => {
  if(!req.session.user) {
    return res.redirect('/login');
  }

  return next()
})

router.get('/', (req, res) => {
  return res.render('cuenta/perfil.pug', {
    title:"Mi cuenta",
    user: req.session.user
  })
})

router.post('/', async (req, res) => {
  const form = req.body;
  form.userId = req.session.user.id;
  form.dni = req.session.user.dni;
  
  try {
    let result;
    if (req.session.user.type == "cliente") {
      result = await controllerCliente.updateClient(form);
    }

    if (req.session.user.type == "empleado") {
      result = await controllerEmpleado.updateEmpl(form);
    }

    if (result == 1) {
      await req.session.destroy();
      //return res.send("Actualizado!");
      return res.render('cuenta/userUpdated', {
        title: "Perfil actualizado"
      })
    } else if (result == 0) {
      return res.send("No se actualizaron datos")
    }

    return res.send("ocurrió un problema. COD " + result);

  } catch (error) {
    return res.send(error);
  }


})


















module.exports = router;