


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

// Fake Delay
// test.before.serial.cb(t => {
  // setTimeout(() => { t.end() }, 2500);
// });

// Load Tests
// require('./models/account');
// require('./models/group');
// require('./models/org');
// require('./models/permission');

// // Lib
// require('./lib/crypto');

// Services
// require('./services/account_create_account');
// require('./services/account_login');
// require('./services/account_update_account');
require('./services/account_verify_email');
