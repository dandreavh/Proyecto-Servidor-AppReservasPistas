var mongoose = require('mongoose');
//var Schema = mongoose.Schema;
// Documentos referenciados
var Usuario = require('../models/Usuario.js');
var Pista = require('../models/Pista.js');
// Modelado de datos para Reservas
var ReservaSchema = new mongoose.Schema({
    fecha_hora_registro: {
        type: Date,
        default: Date.now,
        required: true
    },
    fecha_hora_reservada: {
        type: Date,
        required: true
    },
    participantes: {
        type: Number,
        required: true,
        default: 1
    },
    precio: {
        type: Number,
        required: true,
    },
    pagada: {
        type: Boolean,
        default: false
    },
    comentarios: {
        type: String,
    },
    titular_reserva: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        default: null
    }],
    pista_reservada: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pista',
        default: null
    }],
});

module.exports = mongoose.model('Reserva', ReservaSchema);