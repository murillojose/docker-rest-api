const mongoose = require('mongoose');
const Campanha = require('./campanhaModel');

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  dateCertificates: [
    { type: Date }
  ],
  createdAt: { type: Date, default: Date.now },
  dataEnvio: { type: Date, },
  campanhas: [
    {
      type: Schema.Types.ObjectId,
      ref: Campanha.modelName
    }
  ],
});

const User = mongoose.model('User', modelSchema);

module.exports = { User }