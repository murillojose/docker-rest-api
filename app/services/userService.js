const { User } = require('../models/userModel');
const fs = require('fs');
const csv = require('csv-parser');

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

function importUsersByCSV(file) {
  return new Promise((resolve, reject) => {
    try {
      const newUsers = [];
      const users = [];
      const duplicados = [];
      fs.createReadStream(file.filepath).pipe(csv()).on('data', data => {
        const email = Object.values(data);
        const userDuplicado = newUsers.find(user => user.email == email[0]);

        if (newUsers.length !== 0 && userDuplicado) {
          const erroDuplicado = { mensagem: `erro, usuario com email ${email[0]} não incluido por duplicidade na planilha` }
          duplicados.push(erroDuplicado);
        } else {
          const user = { email: email[0] };
          newUsers.push(user)
        }
      }).on('end', async () => {
        for (const user of newUsers) {
          const existUser = await User.findOne({ email: user.email });

          if (existUser instanceof User) {
            const usuarioJaExiste = { mensagem: `erro, usuario com email ${existUser.email}já se encontra na base de dados` }
            duplicados.push(usuarioJaExiste);
          } else {
            const usuario = new User();
            usuario.email = user.email;
            await usuario.save();
            users.push(user);
          }
        }

        resolve({ users, duplicados })
      })
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = { createUser, includeCampaingUser, getAllUsers, importUsersByCSV };