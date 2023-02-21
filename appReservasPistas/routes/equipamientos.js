var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Equipamiento = require('../models/Equipamiento');
var db = mongoose.connection;



// GET: Devuelve todos los equipamientos
router.get("/", function (req, res, next) {
  Equipamiento.find()
    .exec(function (err, equipamientos) {
      if (err) res.status(500).send(err);
      else res.status(200).json(equipamientos);
    });
});

// GET: Lista un equipamiento segun su id

router.get("/:id", function (req, res, next) {
  let query = Equipamiento.findById(req.params.id).select({
    _id: 0,
    __v: 0,
  });
  query.exec(function (err, datosEquipamiento) {
    if (err) res.status(500).send(err);
    else res.status(200).json(datosEquipamiento);
  });
});

// POST: Crear nuevo equipamiento

router.post("/", function (req, res, next) {
  Equipamiento.create(req.body, function (err, equipamiento) {
    console.log(req.body);
    if (err) res.status(500).send(err);
    else
      res.status(200).send({
        msg: "Equipamiento creado correctamente",
        Equipamiento: equipamiento,
      });
  });
});

// PUT: Actualizar un equipamiento por su ID

router.put("/:id", function (req, res, next) {
  Equipamiento.findByIdAndUpdate(
    req.params.id,
    req.body,
    function (err, datosEquipamiento) {
      if (err) res.status(500).send(err);
      else
        res.status(200).send({
          msg: "Datos actualizados correctamente",
        });
    }
  );
});

// DELETE: Eliminar un equipamiento por su ID
router.delete("/:id", function (req, res, next) {
  Equipamiento.findByIdAndDelete(req.params.id, function (err, equipInfo) {
    if (err) res.status(500).send(err);
    else
      res.status(200).send({
        msg: "Equipamiento eliminado correctamente",
        ID: equipInfo._id,
      });
  });
});

module.exports = router;
