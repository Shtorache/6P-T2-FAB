const mongoose = require("mongoose");

const carroSchema = new mongoose.Schema(
  {
    marca: { type: String, required: true, trim: true },
    modelo: { type: String, required: true, trim: true },
    ano: { type: Number, required: true },
    cor: { type: String, trim: true },
    preco: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carro", carroSchema);

