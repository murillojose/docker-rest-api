const express = require('express');
const formidable = require('formidable');

const { createUser, includeCampaingUser, getAllUsers, editCamapanha, importUsersByCSV } = require('../services/userService');
const router = express.Router();

router.post('/', async (req, res) => {
  const user = req.body;
  const userSaved = await createUser(user);

  res.json(userSaved);
});

router.get('/', async (req, res) => {
  const users = await getAllUsers()
  res.json(users)
})

router.put('/:id', async (req, res) => {
  const idCampanha = req.body.idCampanha;
  const idUser = req.params;

  const newUser = await includeCampaingUser(idUser, idCampanha);

  res.json(newUser);
})

router.post('/import', async (req, res) => {
  const form = new formidable.IncomingForm();
  try {
    form.parse(req, async (err, fields, files) => {
      let file = Object.values(files)[0];

      const result = await importUsersByCSV(file);
      res.send(result);
    });
  } catch (error) {
    res.send(err);
  }
})

module.exports = router;