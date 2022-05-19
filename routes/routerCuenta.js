var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  return res.render('cuenta/perfil.pug', {
    title:"Mi cuenta",
    user: req.session.user
  })
})


















module.exports = router;