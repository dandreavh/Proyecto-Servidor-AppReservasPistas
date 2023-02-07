const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Documentos referenciados
const Usuario = require('../models/Usuario.js');
const Pista = require('../models/Pista.js');
// Modelado de datos para Reservas
const ReservaSchema = new Schema({
    fecha_hora_registro: {
        type: Date,
        default: Date.now
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
    pago: {
        type: Number,
        required: true,
    },
    comentarios: {
        type: String,
    },
    titular_reserva: [{
        type: Schema.ObjectId,
        ref: 'Usuario',
        default: null
    }],
    pista_reservada: [{
        type: Schema.ObjectId,
        ref: 'Pista',
        default: null
    }],
});

module.exports = mongoose.model('Reserva', ReservaSchema);