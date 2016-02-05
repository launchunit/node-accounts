
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Joi = require('joi'),
  ROLES = require('../permissions/roles').roles,
  ROLES_MAP = require('../permissions/roles').rolesMap;


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

  // Permissions
  permissions: {
    org_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),

    roles: Joi.array().unique()
              .items(Joi.string().valid(ROLES)),

    groups: Joi.array().unique()
              .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/))
  },

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.actions = {

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
    last_login: exports.schema.last_login,
    reset_token: exports.schema.reset_token.default(null).valid(null),
    reset_expiry: exports.schema.reset_expiry.default(null).valid(null)
  })
  .requiredKeys('last_login')
  .optionalKeys('reset_token', 'reset_expiry'),

  // Create New Account
  create_account: Joi.object({
    email: exports.schema.email,
    password: exports.schema.password,
    email_verified: exports.schema.email_verified,
    active: exports.schema.active,
    created: exports.schema.created,
    updated: exports.schema.updated,
    reset_token: exports.schema.reset_token.valid(null).default(null),
    reset_expiry: exports.schema.reset_expiry.valid(null).default(null)
  })
  .requiredKeys('email', 'password')
  .optionalKeys('reset_token', 'reset_expiry'),
  //               'updated', 'created', ''),

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
    reset_expiry: exports.schema.reset_expiry.valid(null).default(null)
  })
  .requiredKeys('password')
  .optionalKeys('reset_token', 'reset_expiry'),

};

exports.indexes = [
  [ { email: 1 }, { unique: true, sparse: false } ],
];
