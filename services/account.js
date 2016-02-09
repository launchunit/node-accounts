
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  joiHelpers = require('joi-helpers'),
  Joi = require('joi'),
  crypto = require('../lib/crypto'),
  passwordModel = require('../lib/password_model');


module.exports = db => {

  /**
   * @params {String} input.email
   * @params {Object} input.password
   * @params {Object} input.password_confirm
   *
   * @public
   */
  function createAccount(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      const checkPassword = joiHelpers.validate(passwordModel, input);

      if (checkPassword.error === null) {

        crypto.hash(input.password)
        .then(hashedPassword => {

          const validate = joiHelpers.validate(
              db.collections.account.methods.create_account,
              Object.assign({}, input, {
                password: hashedPassword
              }));


          if (validate.error) {
            delete validate.value;
            return resolve(validate);
          }

          console.log(validate);

        })
        .catch(err => {
          return reject(err);
        });

      }

      else {
        return resolve({ error: checkPassword.error });
      }

    });
  };


  // Return
  return { createAccount };
};



