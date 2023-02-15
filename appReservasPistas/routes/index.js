var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi Pista Ya' });
});

/* GET register page. */
router.get('/registro', function(req, res) {
  res.render('registro', { title: 'Mi Pista Ya' });
});

module.exports = router;