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
        const users = Object.values(data);

        const idxUser = newUsers.findIndex(user => user.email == users[0]);

        if (newUsers.length !== 0 && idxUser >= 0) {

          const user = newUsers[idxUser];

          const idxData = user.dataCertificado.findIndex(data => data = users[1]);
          if (idxData < 0) {
            const erroDuplicado = { mensagem: `erro, usuario com email ${users[0]} não incluido por duplicidade na planilha` }
            duplicados.push(erroDuplicado);
          } else {
            user.dataCertificado.push(users[1]);
            newUsers.splice(idxUser, 1, user);
          }
        } else {
          const user = { email: users[0], dataCertificado: [users[1]] };
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
            const datasCertificados = user.dataCertificado.map(item => {
              const data = item.split('-');
              const year = data[2];
              const month = data[1];
              const day = data[0];
              const newDate = new Date(year, month, day);
              return newDate;
            });
            usuario.dateCertificates = [...datasCertificados]
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