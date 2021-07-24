const { User, Post, User_Post } = require('../models/index');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', async function(req, res) {
  
  try {
    const users = await User.findAll({include: 'posteos'});

    if(users) {
      return res.json(users);
    };
  } catch(err) {
    return res.json(err);
  };

});

module.exports = router;
