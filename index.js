
'use strict';


/**
 * Module dependencies.
 * @private
 */
const mongoDB = require('mongodb-client');


/**
 * @params {Db Instance} opts.db (Optional)
 * @params {Sting} opts.hmacSalt (Optional)
 *
 * @return {Promise}
 * @public
 */
exports.Server = opts => {

  // Clean Up Opts
  opts = Object.assign({
    hmacSalt: 'SvRoxdzS9kuuUZj1k_x=kclb4fdsFvmB',
  }, opts);


  if (opts.db) {
    // Load the Models
    mongoDB.loadModels(__dirname + '/models');
    mongoDB.initModels({
      db: opts.db.db || opts.db
    });
  }

  // Build Return Object
  return Object.assign({},
    opts.db ? require('./services/account')(opts.db) : undefined,
    opts.db ? require('./services/org')(opts.db) : undefined,
    opts.db ? require('./services/group')(opts.db) : undefined,
    opts.db ? require('./services/permission')(opts.db) : undefined,
    require('./services/token')(opts.hmacSalt)
  );
};

/**
 * @params {Object} authServer (Required)
 *
 * @return {Promise}
 * @public
 */
exports.Client = authServer => {
  return require('./services/authorize_route')(authServer);
};
