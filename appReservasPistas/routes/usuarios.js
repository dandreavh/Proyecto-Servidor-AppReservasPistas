const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const Usuario = require('../models/Usuario');
const db = mongoose.connection;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;