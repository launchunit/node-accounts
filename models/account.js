
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  Joi = require('joi'),
  joiHelpers = require('joi-helpers'),
  Timezones = _.map(_.keys(
    require('../lib/timezones')), _.toLower);


/**
 * Account Model
 */
exports.name = 'account';

exports.schema = {

  // Basics
  email: Joi.string().lowercase().trim().email()
            .label('Email'),

  password:  Joi.string().trim().min(10)
                .options({ language: { string: {
                  min: 'Hashed {{key}} seems invalid.'
                }}}),

  // Meta
  active: Joi.boolean().default(true),
  email_verified: Joi.boolean().default(false),
  last_login: Joi.date().min('now').default(new Date),

  // Password Reset
  reset_token: Joi.alternatives().try(
                    Joi.string().guid(),
                    Joi.valid(null)
                  ),

  reset_expiry: Joi.when('reset_token', {
                    is: null,
                    then: Joi.valid(null),
                    otherwise: Joi.date()
                  }),
                  // .label('Password Reset Expiry'),

  // Profile
  first_name: Joi.string().trim().label('First Name'),
  last_name: Joi.string().trim().label('Last Name'),
  picture: Joi.string().lowercase().trim().uri(),
  bio: Joi.string().trim().label('Bio'),
  gender: joiHelpers.anyValid(
            Joi.string().trim().lowercase().label('Gender'),
            ['male', 'female', 'other']),
  timezone: joiHelpers.anyValid(
              Joi.string().trim().lowercase().label('Timezone'),
              Timezones),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Password Reset
  reset_password: Joi.object({
    reset_token: exports.schema.reset_token,
    reset_expiry: exports.schema.reset_expiry
  })
  .requiredKeys('reset_token', 'reset_expiry')
  .options({
    language: {
      any: {
        allowOnly: 'Only specific values are allowed for {{key}}.'
      },
      string: {
        guid: 'Only specific values are allowed for {{key}}.'
      },
      date: {
        base: 'Only specific values are allowed for {{key}}.'
      }
    }
  }),

  // Login
  login: Joi.object({
    last_login: exports.schema.last_login.default(new Date),
    reset_token: exports.schema.reset_token.default(null).valid(null),
    reset_expiry: exports.schema.reset_expiry.default(null).valid(null)
  })
  .optionalKeys('last_login', 'reset_token', 'reset_expiry'),

  // Create New Account
  create_account: Joi.object({
    email: exports.schema.email,
    password: exports.schema.password,
    email_verified: exports.schema.email_verified,
    active: exports.schema.active,
    created: exports.schema.created,
    updated: exports.schema.updated,
    timezone: exports.schema.timezone.default(Timezones[6]), // Default=EST
    reset_token: exports.schema.reset_token.valid(null).default(null),
    reset_expiry: exports.schema.reset_expiry.valid(null).default(null)
  })
  .requiredKeys('email', 'password')
  .optionalKeys('reset_token', 'reset_expiry', 'timezone'),

  // Profile
  profile: Joi.object({
    first_name: exports.schema.first_name,
    last_name: exports.schema.last_name,
    picture: exports.schema.picture,
    bio: exports.schema.bio,
    gender: exports.schema.gender,
    updated: exports.schema.updated,
    timezone: exports.schema.timezone
  })
  .min(2)
  .options({
    language: {
      object: {
        min: '!!Profile object must have at least 1 field to update.',
      }
    }
  }),

  // Update Email
  update_email: Joi.object({
    email: exports.schema.email,
    updated: exports.schema.updated,
  })
  .requiredKeys('email'),

  // Update Email Verify
  verify_email: Joi.object({
    email_verified: exports.schema.email_verified.valid(true).default(true),
    updated: exports.schema.updated,
  }),

  // Update Account Active
  update_active: Joi.object({
    active: exports.schema.active,
    updated: exports.schema.updated,
  })
  .requiredKeys('active'),

  // Update Password
  update_password: Joi.object({
    password: exports.schema.password,
    reset_token: exports.schema.reset_token.valid(null).default(null),
    reset_expiry: exports.schema.reset_expiry.valid(null).default(null),
    updated: exports.schema.updated,
  })
  .requiredKeys('password')
  .optionalKeys('reset_token', 'reset_expiry')
};

exports.indexes = [
  [ { email: 1 }, { unique: true, sparse: false } ],
  // [ { 'permissions.org_id': 1 }, { unique: true, sparse: false } ],
];
