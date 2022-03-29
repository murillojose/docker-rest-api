const mongoose = require('mongoose');

function connect() {
  var mongoaddr = 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/testeapi';
  mongoose.connect(mongoaddr);
}
module.exports = {
  connect
}