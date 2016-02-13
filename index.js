
'use strict';


/**
 * Module dependencies.
 * @private
 */
const mongoDB = require('mongodb-client');


/**
 * @params {Db Instance} opts.db (Required)
 *
 * @return {Promise}
 * @public
 */
module.exports = opts => {

  opts = opts || {};

  return new Promise((resolve, reject) => {

    // Load the Models
    mongoDB.loadModels(__dirname + '/models');
    mongoDB.initModels({
      db: opts.db.db || opts.db
    });

    // Return Services
    return resolve({
      account: require('./services/account')(opts.db),
      org: require('./services/org')(opts.db),
      group: require('./services/group')(opts.db),
      permission: require('./services/permission')(opts.db),
    });

  });
};
