var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', require('../controllers/controllerSolicitud').todo);

router.post('/crear', require('../controllers/controllerSolicitud').crear);

module.exports = router;
