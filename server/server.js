const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;
const mongoURI = process.env.MONGODB_URI;

const integralRoutes = require('./routes/integralRoutes');
const userRoutes = require('./routes/userRoutes'); // import user routes

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use((req, res, next) => {
  console.log('Request URL:', req.url);
  next();
});

// Define API routes
app.use('/api/integrals', integralRoutes);
app.use('/api/users', userRoutes); // use user routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});