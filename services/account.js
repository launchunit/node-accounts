
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  joiHelpers = require('joi-helpers'),
  Joi = require('joi'),
  crypto = require('../lib/crypto'),
  passwordModel = require('../lib/password_model'),
  promiseHelpers = require('promise-helpers');


module.exports = db => {

  /**
   * @params {String} input.email (Required)
   * @params {Object} input.password (Required)
   * @params {Object} input.password_confirm (Required)
   *
   * @params {Object} input.active (Optional Default=true)
   * @params {Object} input.timezone (Optional)
   * @params {Object} input.email_verified (Optional)
   *
   * @public
   */
  function createAccount(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      const checkPassword = joiHelpers.validate(passwordModel, input);

      if (checkPassword.error === null) {
        return resolve(crypto.hash(input.password));;
      }

      return reject({ error: checkPassword.error });
    })
    .then(hashedPassword => {

      const Input = Object.assign({}, input, {
        password: hashedPassword
      });

      const validate = joiHelpers.validate(
        db.collections.account.methods.create_account,
        Input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return promiseHelpers.reject(validate);
      }

      logger.debug(Input);
      logger.debug(validate.value);

      return db.collections.account.insertOne(validate.value);
    })
    .then(result => {

      return result.insertedCount &&
      { result: { _id: result.insertedId }};
    })
    .catch(promiseHelpers.mongoDone);

  };


  // Return
  return { createAccount };
};
