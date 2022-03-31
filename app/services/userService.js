const { User } = require('../models/userModel');

async function createUser(user) {
  try {
    var newUser = new User();

    newUser.email = user.email;

    await newUser.save();

    return newUser;
  } catch (err) {
    console.log(err)
  }
}

async function includeCampaingUser(idUser, idCampanha) {
  let user = await User.findOne(idUser);
  user.campanhas.push(idCampanha);

  await user.save();

  return user;
}

async function getAllUsers() {
  return User.find();
}

module.exports = { createUser, includeCampaingUser, getAllUsers };