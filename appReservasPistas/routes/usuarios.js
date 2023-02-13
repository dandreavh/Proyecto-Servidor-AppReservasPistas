var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Usuario = require('../models/Usuario');
var db = mongoose.connection;

// GET del listado de usuarios ordenados por fecha de creación y sin mostrar el objectID
router.get('/', function(req, res, next) {
  Usuario.find({_id:0}).sort('-creationdate').populate('usuario').exec(function(err, usuarios) {
  if (err) res.status(500).send(err);
  else res.status(200).json(usuarios);
  });
});

// GET de un usuario por su ID
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function(err, userinfo) {
  if (err) res.status(500).send(err);
  else res.status(200).json(userinfo);
  });
});

module.exports = router;