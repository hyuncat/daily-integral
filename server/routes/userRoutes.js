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
  
  console.log(`user logged in: ${username}`); // log the username

  const token = jwt.sign({ userId: user._id }, secretKey); 
  res.send({ token });
});

router.get('/leaderboard', async (req, res) => {
  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    // Fetch all users
    const users = await User.find();

    // Map users to leaderboard entries
    const leaderboard = users.map(user => {
      // Filter previousIntegrals for the current date
      const todaysIntegrals = user.previousIntegrals.filter(integral => integral.date === currentDate);

      return {
        username: user.username,
        attempts: todaysIntegrals.reduce((total, integral) => total + integral.num_attempts, 0),
        time: todaysIntegrals.reduce((total, integral) => total + integral.time, 0)
      };
    });

    // Send leaderboard as response
    res.send(leaderboard);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching leaderboard' });
  }
});

module.exports = router;