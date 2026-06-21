const mongoose = require("mongoose");

const motoSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true, trim: true },
    modelo: { type: String, required: true, trim: true },
    cilindradas: { type: Number, required: true },
    ano: { type: Number, required: true },
    preco: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Moto", motoSchema);

