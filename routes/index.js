var express = require('express');
var router = express.Router();
const clg = require('../tools/clg');

/* GET home page. */
router.get('/', async function (req, res) {

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
    return res.render('home', {title: "Inicio"});
    //res.redirect('/login');
  
  }

});

module.exports = router;
