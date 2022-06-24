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
    console.log("EN EL CHEQUEO DE USUARIO (HAY SESSION.USER)")

    console.log(req.session.user);
    if(req.session.user.type == "empleado") {

      const areaId = req.session.user.AreaId;
      
      if (areaId == 3) {
        return res.redirect('/admin');
      }
      
      if (areaId == 2) {
        return res.redirect('/calidad')
      }
      
      return res.redirect('/empleado');
    }

    if(req.session.user.type == "cliente") {
      return res.redirect('/cliente');
    }

  } else {
    console.log("EN EL ELSE DE HOST/ (NO HAY USER)")

    // Acá debería renderizar un index con tracking por código de solicitud
    return res.render('home');
    //res.redirect('/login');
  
  }

});

module.exports = router;
