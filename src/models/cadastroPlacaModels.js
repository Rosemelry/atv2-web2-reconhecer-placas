const mongoose = require("mongoose");

const cadastroPlacaSchema = new mongoose.Schema({
  nomeCidade: { type: String, required: true },
  placa: { type: String, required: true },
  data: { type: Date, default: Date.now },
  caminhoImagem: { type: String, required: true }, 
});

const CadastroPlaca = mongoose.model('CadastroPlaca', cadastroPlacaSchema);

module.exports = CadastroPlaca;
