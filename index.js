
'use strict';


/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  mongoDB = require('mongodb-client');


/**
 * @params {Db Instance} opts.db (Required)
 * @params {Object} opts.logger (Required)
 *
 * @return {Promise}
 * @public
 */
module.exports = opts => {

  opts = opts || {};

  return new Promise((resolve, reject) => {

    // Load the Models
    mongoDB.loadModels(__dirname + '/models');
    mongoDB.initModels(opts);

    // Load Services
    return resolve({
      account: require('./services/account')
    });

  });
};
