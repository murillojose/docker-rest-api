const express = require('express');

const router = express.Router();

const emailService = require('../services/emailService');

router.get('/init/:quantidade', async (req, res) => {
  const { quantidade } = req.params;
  const contadorEmailsEnviados = await emailService.enviaEmails(quantidade);
  res.send(contadorEmailsEnviados);
});

router.get('/finish', (req, res) => {
  //TODO parar envio de emails
})

module.exports = router;