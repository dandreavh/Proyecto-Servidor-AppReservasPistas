const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PistaSchema = new Schema({
    tipo: {
        type: String,
        enum: ['Balonmano','Pádel','Hockey','Fútbol sala','Fútbol 11','Fútbol 7','Tenis'],
        required: true
    },
    aforo: {
        type: Number,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    cubierta: {
        type: Boolean
    },
    tipoSuelo: {
        type: String,
        enum: ['Cemento','Césped','Pavimento','Tierra','Arena'],
        required: true
    }
});

module.exports = mongoose.model('Pista', PistaSchema);