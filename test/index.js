


const test = require('ava'),
  mongoDB = require('mongodb-client');

// Global Logger
require('express-logger')({ level: 'debug' });


// Connect to Mongodb:
test.before.serial(t => {

  return mongoDB.connect({
    mongoUrl: process.env.MONGO_URL,
    debug: false
  })
  .then(db => {
    global.DB = db;
    return require('../')({ db: db });
  })
  .then(services => {
    global.Services = services;
  });

});

// Load Tests
// require('./models/account');
// require('./models/group');
// require('./models/org');
// require('./models/permission');

// // Lib
// require('./lib/password_model');
// require('./lib/crypto');

// Services
require('./services/account');
