const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  codigo: { type: String },
  descricao: { type: String },
  email: { type: String },
  dataInicio: { type: Date },
  dataFim: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const Campanha = mongoose.model('Campanha', modelSchema);

module.exports = { Campanha }