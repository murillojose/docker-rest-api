const { User } = require('../models/userModel');

async function createUser(user) {
  var newUser = new User();

  newUser.email = user.email;

  newUser.save();

  return newUser;
}

module.exports = { createUser };