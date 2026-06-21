const mongoose = require("mongoose");

const marcaRoupaSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true, trim: true },
    paisOrigem: { type: String, trim: true },
    categoria: { type: String, trim: true },
    anoFundacao: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("MarcaRoupa", marcaRoupaSchema);

