const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Pista = require('../models/Pista.js');
const EquipamientoSchema = new Schema({
  tipo: {
    type: String,
    required: true,
  },
  cantidad: { 
    type: Number, 
    default: 0,
    min: 0, 
    required: true, 
  },
  marca: {
    type: String,
  },
  talla: {
    type: String,
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
    default: "M ",
    required: true,
  },
  reutilizable: {
    type: Boolean,
  },
  fecha_adquisicion: {
    type: Date,
    default: Date.now,
    required: true,
  },
  cod_pista: [
    {
      type: Schema.ObjectId,
      ref: "Pista",
      default: null,
    },
  ],
});

module.exports = mongoose.model('Equipamiento', EquipamientoSchema);