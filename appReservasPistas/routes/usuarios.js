var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Usuario = require('../models/Usuario');
var db = mongoose.connection;

// GET: Listar usuarios ordenados por fecha de registro
router.get('/', function(req, res, next) {
  Usuario.find().sort('-fecha_registro').exec(function(err, usuarios) {
    if (err) res.status(500).send(err);
    else res.status(200).json(usuarios);
  });
});

// GET: Listar un usuario por su ID (no se muestra ni el id ni el --v)
router.get('/find/:id', function(req, res, next) {
  let query = Usuario.findById(req.params.id).select({"_id": 0, "__v":0});
  query.exec(function(err, datosUsuario){
    if (err) res.status(500).send(err);
    else res.status(200).json(datosUsuario);
  });
});

// GET: Listar solo los usuarios por su rol
router.get("/all", function(req, res, next) {
  console.log(req.query);
  let user_rol = req.query.rol;
  let query = Usuario.find({rol:user_rol}).select({"_id": 0, "__v":0});
  query.exec(function(err, datosUsuario){
    if (err) res.status(500).send(err);
    else res.status(200).json(datosUsuario);
  });
});

// POST: Crear un nuevo usuario
router.post('/', function(req, res, next) {
  Usuario.create(req.body, function(err, usuario) {
    console.log(req.body)
    if (err) res.status(500).send(err);
    else res.status(200).send({msg:"Usuario creado correctamente", "usuario": usuario});
  });
});

// POST: Logar usuario
router.post('/login', function(req, res, next) {
  Usuario.findOne({ email: req.body.email }, function(err, user) {
    if (err) res.status(500).send(err);
    if (user != null) {
      if(user.password == req.body.password){
        res.status(200).send({ message: 'Bienvenido/a, '+user.nombre});
      }else res.status(200).send({ message: 'Algún dato es erróneo' });
    } else res.status(401).send({ message: 'El usuario no existe'});
  });
});  

// PUT: Actualizar un usuario por su ID
router.put('/:id', function(req, res, next) {
  Usuario.findByIdAndUpdate(req.params.id, req.body, function(err, datosUsuario){
      if (err) res.status(500).send(err);
      else res.status(200).send({msg:"Datos actualizados correctamente"});
  });
});

// DELETE: Eliminar un usuario por su ID
router.delete('/:id', function(req, res, next) {
  Usuario.findByIdAndDelete(req.params.id, function(err, userinfo) {
      if (err) res.status(500).send(err);
      else res.status(200).send({msg:"Usuario eliminado correctamente", "ID": userinfo._id});
  });
});

module.exports = router;