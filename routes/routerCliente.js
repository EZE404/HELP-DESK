var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', require('../controllers/controllerCliente').todos);

router.post('/crear', require('../controllers/controllerCliente').crear);

module.exports = router;
