var express = require("express");
var router = express.Router();
let Equipamiento = "../models/Equipamiento";
/* var mongoose = require('mongoose');
var db = mongoose.connection; */

// GET: Devuelve todos los equipamientos
router.get("/", function (req, res, next) {
  Equipamiento.find()
    .populate("equipamiento")
    .exec(function (err, equipamientos) {
      if (err) res.status(500).send(err);
      else res.status(200).json(equipamientos);
    });
});

// GET: Devuelve todos los equipamientos de un tipo

router.get("/:id", function (req, res) {
    Equipamiento.find({
    tipo: req.params.tipo,
  })
    .sort("-tipo")
    .populate("equipamiento")
    .exec(function (err, equipamientos) {
      if (err) res.status(500).send(err);
      else res.status(200).json(equipamientos);
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
    Equipamiento.findByIdAndUpdate(req.params.id, req.body, function (err, datosEquipamiento) {
    if (err) res.status(500).send(err);
    else
      res.status(200).send({
        msg: "Datos actualizados correctamente",
      });
  });
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
