// server.js
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const config = require('./app/config');
const router = require('./app/router');

const app = express();

app.use(bodyParser.json());

if (process.env.NODE_ENV === "test") {
  app.set('port', config.test_port);
  app.listen(app.get('port'), err => {
    if (err) console.error(err);
    console.log(`Server listening on port ${app.get('port')}...`);
    mongoose.connect(config.test_db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch(error => {
      console.error('MongoDB connection error:', error);
    });
  });
} else {
  app.set('port', config.port);
  app.listen(app.get('port'), err => {
    if (err) console.error(err);
    console.log(`Server listening on port ${app.get('port')}...`);
    mongoose.connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).catch(error => {
      console.error('MongoDB connection error:', error);
    });
    mongoose.connection.on('connected', () => {
      console.log(`Mongoose connected to ${config.db}`);
    });
  });
}

router(app);

// needed for testing purposes only
module.exports = app;
