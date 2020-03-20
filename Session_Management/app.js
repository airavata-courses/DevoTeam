const mongoose = require('mongoose');
const express = require('express');
const Session = require('./models/session');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://mongo/session', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Arrow-Methods', 'PUT, POST, PATCH, DELETE');
    return res.status(200).json({});
  }
  next();
});

app.post('/save', async (req, res, next) => {
  try {
    const { email, year, month, day, radar } = req.body;

    const session = new Session({
      email,
      year,
      month,
      day,
      radar
    });
    session.save();
    return res.status(201).send('Saved user input to database');
  } catch (error) {
    console.log(error);
  }
});

app.post('/fetch', async (req, res, next) => {
  try {
    const sessionData = await Session.find({ ...req.body }).exec();
    return res.status(200).json(sessionData);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = app;