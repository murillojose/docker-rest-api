const { User } = require('../models/userModel');

function montaArrayEmails(users) {
  const arrEmail = users.map(user => user.email);

  return arrEmail;
}

async function buscaPrimeiros100Usuarios() {
  const users = await User.find({ dataEnvio: null }).limit(100);

  return users;
}

function getTextoEmails() {
  return `Prezados(as) Clientes!

 

  Compartilhamos a seguir o link para acesso à versão mais recente da Política de Privacidade da AC Soluti: https://www.soluti.com.br/politica-de-privacidade
  
   
  
  Permanecemos à disposição para quaisquer esclarecimentos.
  
   
  
  Atenciosamente,`
}

async function enviaEmails() {
  const textEmail = getTextoEmails();
  let emailsEnviados = 0;

  const users = await buscaPrimeiros100Usuarios();

  const emails = await montaArrayEmails(users);

  emails.forEach(async email => {
    await enviaEmail(email, textEmail);
    emailsEnviados++;
  })

  return emailsEnviados;
}

async function enviaEmail(email, text) {
  console.log(email, text)
}

module.exports = { enviaEmails }