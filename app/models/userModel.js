const mongoose = require('mongoose');
const Campanha = require('./campanhaModel');

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  email: { type: String },
  createdAt: { type: Date, default: Date.now },
  campanhas: [
    {
      type: Schema.Types.ObjectId,
      ref: Campanha.modelName
    }
  ],
});

const User = mongoose.model('User', modelSchema);

module.exports = { User }