
const test = require('ava'),
  Mongodb = require('mongodb-client');



// Connect to Mongodb:
test.before(t => {

  // Load the Models
  Mongodb.loadModels('../models');

  // Connect to Mongodb
  return new Promise((resolve) => {

    return Mongodb.connect({
      mongoUrl: process.env.MONGO_URL
    })
    .then(function(db) {

      global.DB = db;

      // Fake Delay
      setTimeout(() => {
        resolve()
      }, 500);

    });
  });
});

// Account Model
require('./account_model');
