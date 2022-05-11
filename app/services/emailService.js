const { User } = require('../models/userModel');
const { sendMail } = require('./sesService');

function montaArrayEmails(users) {
  const arrEmail = users.map(user => user.email);

  return arrEmail;
}

async function buscaUsuarios(quantidade) {
  console.log(quantidade)
  const users = await User.find({ dataEnvio: null }).limit(quantidade);

  return users;
}

function getTextoEmails() {
  return `Prezados(as) Clientes!

 

  Compartilhamos a seguir o link para acesso à versão mais recente da Política de Privacidade da AC Soluti: https://www.soluti.com.br/politica-de-privacidade
  
   
  
  Permanecemos à disposição para quaisquer esclarecimentos.
  
   
  
  Atenciosamente,`
}

async function enviaEmails(quantidade) {
  const textEmail = getTextoEmails();
  let emailsEnviados = 0;

  const users = await buscaUsuarios(quantidade);

  const emails = await montaArrayEmails(users);

  for (let email in emails) {
    await enviaEmail(email, textEmail);
    emailsEnviados += 1;
  }
  const resultEmails = { quantidadeEmailsEnviados: emailsEnviados };
  return resultEmails;
}

async function enviaEmail(email, text) {
  await sendMail(email, text, 'Informativo LGPD');
}

module.exports = { enviaEmails }