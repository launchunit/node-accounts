
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
      }, 1000);

    });
  });
});

// Models
// require('./account_model');
// require('./group_model');
// require('./org_model');
require('./permission_model');
