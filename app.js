const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const cors = require('cors');

dotenv.config({ path: ('.env') });

const databaseUrl = "mongodb://127.0.0.1:27017/vending-machine";

const connectionParams={
  useNewUrlParser: true,
  useUnifiedTopology: true
}

app.use(express.json({limit: '1mb' }));

mongoose.connect(databaseUrl, connectionParams)
  .then( () => {
    console.log('Connected to database ')
  })
  .catch( (err) => {
    console.error(`Error connecting to the database. \n${err}`);
  })

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content'
  );

  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


// app.use('/api/user', userRoutes);
// app.use('/api/generate-id', generatedIDRoutes);
app.use('/api/payment', require('./api/routes/payment'));
app.use('/api/items', require('./api/routes/items'))


module.exports = app;
