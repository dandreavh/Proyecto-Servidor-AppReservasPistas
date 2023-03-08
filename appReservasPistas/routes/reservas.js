var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Reserva = require('../models/Reserva');
var Usuario = require('../models/Usuario');
var Pista = require('../models/Pista');
var db = mongoose.connection;
const { body, validationResult } = require('express-validator');

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
router.post('/', 
  // validaciones
  // el número de participantes debe ser mayor que 1
  body('participantes').isInt({min:1}).exists().withMessage('El número de participantes debe ser mayor a uno'),
  // la fecha y hora reservada debe ser requerida y posterior a la fecha actual
  body('fecha_hora_reservada').isDate().exists().withMessage('La fecha y hora reservada debe ser correcta'),
  // el precio debe ser superior a 0
  body('precio').isInt({min:1}).exists().withMessage('El precio debe ser mayor a uno'),
  // el campo de comentario debe tener como máximo 2000 caracteres
  body('comentarios').isLength({ max: 300}).withMessage('Máximo 300 caracteres permitidos en los comentarios'),
  // el campo del titular de la reserva debe ser requerido y de tipo objeto id de mongo
  body('titular_reserva').isMongoId().exists().withMessage('Debe ser el ObjectId del titular'),
  // el campo de la pista reservada debe ser requerido y de tipo objeto id de mongo
  body('pista_reservada').isMongoId().exists().withMessage('Debe ser el ObjectId de la pista'),

  function(req, res, next) {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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