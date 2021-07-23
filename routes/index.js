var express = require('express');
var router = express.Router();
const clg = require('../tools/clg');

/* GET home page. */
router.get('/', async function (req, res) {

  if (req.session.user) {
    clg.objeto(req.session.user);
    const solicitudes = await require('../controllers/controllerSolicitud').getByClienteId(req.session.user.id);
    res.render('index', {
      title: "Inicio",
      type: req.session.type,
      auth: true,
      solicitudes
    });

  } else {

    res.redirect('/login');
  
  };

});

module.exports = router;
