var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var Pista = require('../models/Pista');
var db = mongoose.connection;
const {
    body,
    validationResult
} = require('express-validator');


/* GET: Devuelve todas las pistas  */

router.get('/', function (req, res, next) {
    Pista.find().exec(function (err, pistas) {
        if (err) res.status(500).send(err);
        else res.status(200).json(pistas);
    });
});

/* GET: Listar una pista por su id */

router.get('/:id', function (req, res, next) {
    let query = Pista.findById(req.params.id).select({
        "_id": 0,
        "__v": 0
    });
    query.exec(function (err, datosPista) {
        if (err) res.status(500).send(err);
        else res.status(200).json(datosPista);
    });
});

/* POST: Crear nueva pista */

router.post('/', function (req, res, next) {

    body('tipo').isIn(Pista.schema.path('tipo').enumValues),
    body('nombre').optional().isString(),
    body('aforo').isInt({
        min: 1
    }),
    body('ubicacion').isString(),
    body('precio').isInt({
        min: 0
    }),
    body('cubierta').optional().isBoolean(),
    body('tipoSuelo').isIn(Pista.schema.path('tipoSuelo').enumValues),

        Pista.create(req.body, function (err, pista) {
            console.log(req.body)
            if (err) res.status(500).send(err);
            else
                res.status(200).send({
                    msg: "Pista creada correctamente",
                    Pista: pista
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