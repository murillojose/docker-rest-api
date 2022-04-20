var express = require('express');
var bodyParser = require('body-parser');
var app = express();

const { connect } = require('./utils/mongooseConnection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api/campanha', require('./routers/campanhaRouter'));
app.use('/api/user', require('./routers/userRouter'));
app.use('/api/email', require('./routers/emailRouter'));

//Porta de escuta do servidor
app.listen(8080, async () => {
  console.log('Funcionando');
  await connect()
});