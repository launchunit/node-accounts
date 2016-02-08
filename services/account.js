
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  joiHelpers = require('joi-helpers'),
  Joi = require('joi'),
  passwordModel = require('../lib/password_model');


/**
 * @private
 */


/**
 * @params {String} input.email
 * @params {Object} input.password
 * @params {Object} input.passwordConfirm
 *
 * @public
 */
exports.createAccount = input => {

  return new Promise((resolve, reject) => {

    const checkPassword = joiHelpers.validate(passwordModel, input);

    if (checkPassword.error === null) {


    }

    else {
      return resolve(checkPassword.error.details);
    }

    // Bcrypt.hash(password, SALT_ROUNDS, (err, hashedPassword) => {
    //   if (err) return reject(err);
    //   return resolve(hashedPassword);
    // });

  });
};
