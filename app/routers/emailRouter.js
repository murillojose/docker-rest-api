const express = require('express');

const router = express.Router();

const emailService = require('../services/emailService');

router.get('/init', async (req, res) => {
  const contadorEmailsEnviados = await emailService.enviaEmails();

  res.send(contadorEmailsEnviados);
});

router.get('/finish', (req, res) => {
  //TODO parar envio de emails
})

module.exports = router;