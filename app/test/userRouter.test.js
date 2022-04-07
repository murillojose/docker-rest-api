const { createUser } = require("../services/userService");
const { MongoClient } = require('mongodb');

describe('insert', () => {
  let db;

  beforeAll(async () => {
    connection = await MongoCLient.connect('mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/test',
      { useNewUrlParser: true, useUnifiedTopology: true }
    );

    db = await connection.db('mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':27017/test');
  })
})