var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const { connect } = require('./utils/mongooseConnection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/task', require('./routers/taskRouter'));
app.use('/api/campanha', require('./routers/campanhaRouter'));
app.use('/api/user', require('./routers/userRouter'));

//Porta de escuta do servidor
app.listen(8080, async function () {
  console.log('Funcionando');
  await connect()
});