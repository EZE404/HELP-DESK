var express = require('express');
var router = express.Router();
const clg = require('../tools/clg');

/* GET home page. */
router.get('/', function (req, res, next) {

  if (req.session.user) {
    clg.objeto(req.session.user);
    //res.send(`Hola ${req.session.user.nombre}`);
    res.render('index', {
      title: "Inicio",
      user: req.session.user,
      type: req.session.type
    });

  } else {

    res.redirect('/login');
  
  };

});

/* router.get('/', function (req, res, next) {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
}); */

module.exports = router;
