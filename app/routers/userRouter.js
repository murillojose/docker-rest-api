const express = require('express');

const { createUser } = require('../services/userService');
const router = express.Router();

router.post('/', async (req, res) => {
  const user = req.body;
  const userSaved = await createUser(user);

  res.json(userSaved);
  // res.json('ok')
});

module.exports = router;