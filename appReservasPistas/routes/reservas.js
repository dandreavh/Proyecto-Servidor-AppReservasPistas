var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Reserva = require('../models/Reserva');
var Usuario = require('../models/Usuario');
var Pista = require('../models/Pista');
var db = mongoose.connection;

// GET: Listar reservas ordenadas por fecha de registro, con el nombre y apellido del titular de la reserva y el tipo de pista con su suelo
router.get('/', function(req, res, next) {
  Reserva.find()
  .populate(
    [{
        path: 'titular_reserva',
        model: 'Usuario',
        select: '_id nombre apellidos'
    }, {
        path: 'pista_reservada',
        model: 'Pista',
        select: '-_id tipo tipoSuelo'
    }])
  .sort('-fecha_hora_registro')
  .exec(function(err, reservas) {
    if (err) res.status(500).send(err);
    else res.status(200).json(reservas);
  });
});

// GET: Listar una reserva por su ID con el nombre y apellido del titular de la reserva y el tipo de pista con su suelo
router.get('/find/:id', function(req, res, next) {
  let query = Reserva.findById(req.params.id).select({"_id": 0});
  query.populate(
    [{
        path: 'titular_reserva',
        model: 'Usuario',
        select: '-_id nombre apellidos'
    }, {
        path: 'pista_reservada',
        model: 'Pista',
        select: '-_id tipo tipoSuelo'
    }])
  .exec(function(err, datosReserva){
    if (err) res.status(500).send(err);
    else res.status(200).json(datosReserva);
  });
});

// GET: Listar solo las reservas por su estado de pago
router.get("/estado", function(req, res, next) {
  let estado = req.query.pagada;
  let query = Reserva.find({pagada:estado}).select({"_id": 0});
  query.populate(
    [{
        path: 'titular_reserva',
        model: 'Usuario',
        select: '-_id nombre apellidos'
    }, {
        path: 'pista_reservada',
        model: 'Pista',
        select: '-_id tipo tipoSuelo'
    }])
    .exec(function(err, datosReservas){
    if (err) res.status(500).send(err);
    else res.status(200).json(datosReservas);
  });
});

// GET: Listar reservas para una pista concreta
router.get("/pista/:id", function(req, res, next) {
  let query = Reserva.find({pista_reservada:req.params.id});
  query.populate(
    [{
        path: 'titular_reserva',
        model: 'Usuario',
        select: '-_id nombre apellidos email dni'
    }, {
        path: 'pista_reservada',
        model: 'Pista',
        select: '-_id tipo tipoSuelo'
    }])
    .exec(function(err, datosReservas){
    if (err) res.status(500).send(err);
    else res.status(200).json(datosReservas);
  });
});

// GET: Listar reservas de un usuario
router.get("/find", function(req, res, next) {
  let user = req.query.titular_reserva;
  let query = Reserva.find({titular_reserva:user});
  query.populate(
    [{
        path: 'titular_reserva',
        model: 'Usuario',
        select: '-_id nombre apellidos'
    }, {
        path: 'pista_reservada',
        model: 'Pista',
        select: '-_id tipo tipoSuelo'
    }])
    .exec(function(err, datosReservas){
    if (err) res.status(500).send(err);
    else res.status(200).json(datosReservas);
  });
});

// POST: Crear una nueva reserva
router.post('/', function(req, res, next) {
  Reserva.create(req.body, function(err, reserva) {
    if (err) res.status(500).send(err);
    else res.status(200).send({msg:"Reserva creada correctamente", "reserva": reserva});
  });
});

// PUT: Actualizar una reserva por su ID
router.put('/:id', function(req, res, next) {
  Reserva.findByIdAndUpdate(req.params.id, req.body, function(err, datosReserva){
      if (err) res.status(500).send(err);
      else res.status(200).send({msg:"Datos actualizados correctamente"});
  });
});

// DELETE: Eliminar una reserva por su ID
router.delete('/:id', function(req, res, next) {
  Reserva.findByIdAndDelete(req.params.id, function(err, datosReserva) {
      if (err) res.status(500).send(err);
      else res.status(200).send({msg:"Reserva eliminada correctamente", "ID": datosReserva._id});
  });
});

module.exports = router;