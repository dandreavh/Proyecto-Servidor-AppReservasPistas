var express = require('express');
const Reserva = require('../models/Reserva');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi Pista Ya' });
});

/* GET register page. */
router.get('/registro', function(req, res) {
  res.render('registro', { title: 'Mi Pista Ya' });
});

/* GET reservas page. */
router.get('/reservas', async function(req, res) {
  const reservas = await Reserva.find();
  res.render('reservas', {reservas}); 
});

module.exports = router;