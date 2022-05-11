const aws = require("@aws-sdk/client-ses");
const nodemailer = require("nodemailer");

module.exports = {
  sendMail
}

async function sendMail(to, content, subject, bcc = false, attachments = false, headers = false) {
  const fromEmail = 'no-reply-stg@vaultid.com.br';
  const fromNameEmail = 'nomeTesteEmail';

  const ses = new aws.SES({ apiVersion: '2010-12-10', region: 'us-east-1' });

  const transporter = nodemailer.createTransport({
    SES: { ses, aws }
  });

  const objectSendMail = {
    from: `'${fromNameEmail}' <${fromEmail}>`,
    to,
    subject,
    text: content,
    html: content
  };

  if (bcc) {
    objectSendMail.bcc = bcc;
  }

  if (attachments) {
    objectSendMail.attachments = attachments;
  }

  if (headers) {
    objectSendMail.headers = headers;
  }

  return new Promise((resolve, reject) => {
    transporter.sendMail(objectSendMail, (err, info) => {
      if (err) {
        console.log(err);
        return reject(err);
      }

      resolve({ info, objectSendMail });
    })
  })
}