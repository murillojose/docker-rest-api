var Task = (function () {
  const mongoose = require('mongoose');

  const Schema = mongoose.Schema;

  var modelSchema = new Schema({
    descricao: { type: String },
    concluido: Boolean,
    updated_at: { type: Date, default: Date.now },
  });
  return mongoose.model('Task', modelSchema);
})();


module.exports = { Task }