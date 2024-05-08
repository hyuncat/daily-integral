const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // path to User model


const router = express.Router();
const secretKey = process.env.JWT_SECRET;

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = new User({ username, password });
    await user.save();

    console.log(`account created: ${username}`); // log the account information

    const token = jwt.sign({ userId: user._id }, secretKey); 
    res.send({ token });
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).send({ error: 'Invalid username or password' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).send({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ userId: user._id }, secretKey); 
  res.send({ token });
});

module.exports = router;