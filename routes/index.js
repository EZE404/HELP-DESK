var express = require('express');
var router = express.Router();
const clg = require('../tools/clg');

/* GET home page. */
router.get('/', async function (req, res) {

  // Acá debería controlar el tipo de rol y derivar a /admin, /empleado, o /cliente
/*   if (req.session.user) {
    clg.objeto(req.session.user);
    const solicitudes = await require('../controllers/controllerSolicitud').getByClienteId(req.session.user.id);
    res.render('index', {
      title: "Inicio",
      type: req.session.type,
      user: req.session.user,
      auth: true,
      solicitudes
    }); */

  if(req.session.user) {

    if(req.session.type == "empleado") {
      const admin = req.session.user.admin;
      if (admin) {
        return res.redirect('/admin');
      } else {
        return res.redirect('/empleado');
      }
    }

    if(req.session.type == "cliente") {
      return res.redirect('/cliente');
    }

  } else {

    // Acá debería renderizar un index con tracking por código de solicitud
    return res.render('home');
    //res.redirect('/login');
  
  }

});

module.exports = router;
