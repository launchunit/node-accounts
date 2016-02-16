
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash');


/**
 * Constants
 */
const SESSION_HEADER = 'X-Session-Token',
  Roles = require('../lib/roles').rolesMap;


module.exports = authServer => {

  /**
   * @params {Array} roles
   *
   * @public
   */
  return roles => {

    if (! Array.isArray(roles)) {
      new Error('Authorize route roles must be an array.')
    }

    // Validate Roles
    _.forEach(roles, role => {
      if (rolesMap[role] === undefined)
        new Error(`Authorize route role "${role}" is invalid.`);
    });

    // Convert to Object
    roles = _.zipObject(roles);


    // Authorize Route Middleware
    return (req, res, next) => {

      const token = req.get(SESSION_HEADER);

      // Validate Token
      if (token) {

        authServer.validateToken(token)
        .then(result => {

        })
        .catch(err => {

        });

        // && bufferEq(MASTER_TOKEN, token)) {
        // req._session = req._session || {};
        // req._session.masterToken = true;
        // return next();
      }

      // Auth Failed
      return app.writeJson(res, 'not_authorized');
    };

  };
};
