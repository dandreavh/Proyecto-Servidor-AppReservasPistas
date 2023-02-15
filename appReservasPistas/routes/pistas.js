var express = require('express');
var router = express.Router();
let Pista = ('../models/Pista')
/* var mongoose = require('mongoose');
var db = mongoose.connection; */

/* GET: Devuelve todas las pistas  */
router.get('/', function (req, res, next) {
    Pista.find().populate('pista').exec(function (err, pistas) {
        if (err) res.status(500).send(err);
        else res.status(200).json(pistas);
    });
});

/* GET: Devuelve todas las pistas de una ubicación concreta */

router.get('/:id', function (req, res) {
    Pista.find({
        'user': req.params.ubicacion
    }).sort('-ubicacion').populate('pista').exec(function (err, pistas) {
        if (err) res.status(500).send(err);
        else res.status(200).json(pistas);
    });
});

/* POST: Crear nueva pista */

router.post('/', function (req, res, next) {
    Pista.create(req.body, function (err, pista) {
        console.log(req.body)
        if (err) res.status(500).send(err);
        else res.status(200).send({
            msg: "Pista creada correctamente",
            "Pista": pista
        });
    });
});

/* PUT: Actualizar una pista por su ID */

router.put('/:id', function (req, res, next) {
    Pista.findByIdAndUpdate(req.params.id, req.body, function (err, datosPista) {
        if (err) res.status(500).send(err);
        else res.status(200).send({
            msg: "Datos actualizados correctamente"
        });
    });
});

/* DELETE: Eliminar una pista por su ID */
router.delete('/:id', function (req, res, next) {
    Pista.findByIdAndDelete(req.params.id, function (err, pistainfo) {
        if (err) res.status(500).send(err);
        else res.status(200).send({
            msg: "Pista eliminada correctamente",
            "ID": pistainfo._id
        });
    });
});

module.exports = router;