var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/usuarios', (req, res) => {
  res.render('registro', { title: 'Mi Pista Ya'});
})

module.exports = router;