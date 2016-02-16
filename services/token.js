
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  Hmac = require('../lib/hmac'),
  joiHelpers = require('joi-helpers'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId();


module.exports = HMAC_SALT => {

  // Type Case It
  HMAC_SALT = HMAC_SALT.toString();


  /**
   * @params {String} input.id (Required)
   * @params {String} input.org_id (Required)
   *
   * @public
   */
  function createToken(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      // Validate id
      const validateId = joiHelpers.validate(objectId,
                           (input.id || ''));

      if (validateId.error) {
        delete validateId.value;
        return reject(validateId);
      }

      // Validate org_id
      const validateOrgId = joiHelpers.validate(objectId,
                           (input.org_id || ''));

      if (validateOrgId.error) {
        delete validateOrgId.value;
        return reject(validateOrgId);
      }

      return resolve(Hmac.seal(input, HMAC_SALT));
    })
    .then(result => {
      return { result: result };
    })
    .catch(promiseHelpers.done);
  };


  /**
   * @params {String} token (Required)
   *
   * @public
   */
  function validateToken(token) {

    return Hmac.unseal(token, HMAC_SALT)
    .then(result => {
      return { result: result };
    })
    .catch(promiseHelpers.done);
  };


  // Return
  return {
    createToken,
    validateToken
  };

};
