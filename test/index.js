


const test = require('ava'),
  mongoDB = require('mongodb-client');


// Connect to Mongodb:
test.before.serial(t => {

  return new Promise(resolve => {

    return mongoDB.connect({
      mongoUrl: process.env.MONGO_URL
    })
    .then(db => {

      // Load the Lib
      return require('../')({
        db: db.db
      })
      .then(services => {

        // Load Stuff Globally
        global.DB = db;
        global.services = services;

        return resolve();
      });

    });
  });

});

// Load Tests
require('./models/account');
require('./models/group');
require('./models/org');
require('./models/permission');

// Lib
require('./lib/password_model');
