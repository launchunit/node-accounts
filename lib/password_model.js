
'use strict';

/**
 * Module dependencies.
 * @private
 */
const joiHelpers = require('joi-helpers'),
  Joi = require('joi');


/**
 * @public
 */
module.exports = joiHelpers.compile(Joi.object({

  password: Joi.string().min(6).label('Password'),

  password_confirm: Joi.any().valid(Joi.ref('password'))
                      .label('Password Confirmation').strip()
})
.requiredKeys('password', 'password_confirm'))
.options({
  language: {
    string: {
      min: '{{key}} must be at least {{limit}} characters long.'
    },
    any: {
      allowOnly: '{{key}} does not match Password.'
    }
  }
});
