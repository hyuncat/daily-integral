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

router.post('/signup-and-post', async (req, res) => {
  const { username, password, n_attempts, time } = req.body;

  try {
    const date = new Date().toISOString().split('T')[0]; // get the current date in YYYY-MM-DD format
    const user = new User({ 
      username, 
      password, 
      previousIntegrals: [{ date, n_attempts, time }] 
    });
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
    return res.status(400).send({ error: 'invalid username' });
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(400).send({ error: 'invalid password' });
  }
  
  console.log(`user logged in: ${username}`); // log the username

  const token = jwt.sign({ userId: user._id }, secretKey); 
  res.send({ token });
});


router.put('/post-entry', async (req, res) => {
  const { username, n_attempts, time } = req.body;

  try {
    const date = new Date().toISOString().split('T')[0]; // get the current date in YYYY-MM-DD format

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.previousIntegrals.push({ date: date, n_attempts: n_attempts, time: time });

    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/leaderboard', async (req, res) => {
  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split('T')[0];

  try {
    // Fetch all users
    const users = await User.find();

    // Filter users who have a previousIntegral for the current date
    const usersWithTodaysIntegral = users.filter(user => 
      user.previousIntegrals.some(integral => integral.date === currentDate)
    );

    // Map users to leaderboard entries
    const leaderboard = usersWithTodaysIntegral.map(user => {
      // Filter previousIntegrals for the current date
      const todaysIntegrals = user.previousIntegrals.filter(integral => integral.date === currentDate);

      return {
        username: user.username,
        n_attempts: todaysIntegrals.reduce((total, integral) => total + integral.n_attempts, 0),
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