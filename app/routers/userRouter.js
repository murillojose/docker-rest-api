const express = require('express');

const { createUser, includeCampaingUser, getAllUsers } = require('../services/userService');
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

module.exports = router;