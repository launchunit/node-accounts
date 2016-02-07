
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  Joi = require('joi'),
  joiHelpers = require('joi-helpers'),
  ROLES = require('../constants/roles').roles;


/**
 * Permission Model
 */
exports.name = 'permission';

exports.schema = {

  // Basics
  account_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),

  org_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),

  roles: Joi.array().unique().sparse(false)
            .items(Joi.string().valid(ROLES)),

  groups: Joi.array().unique().sparse(false)
             .items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Permission
  create_account: Joi.object({
    account_id: exports.schema.account_id,
    org_id: exports.schema.org_id,
    roles: exports.schema.roles,
    groups: exports.schema.groups,
    created: exports.schema.created,
    updated: exports.schema.updated,
  })
  .requiredKeys('account_id', 'org_id', 'roles'),

  // Update Role
  update_roles: Joi.object({
    account_id: exports.schema.account_id.strip(),
    org_id: exports.schema.org_id.strip(),
    roles: exports.schema.roles,
    updated: exports.schema.updated,
  })
  .requiredKeys('account_id', 'org_id', 'roles'),
  // // .options({
  // //   language: {
  // //     array: {
  // //       base: '{{!!key}} Invalid permissions.'
  // //     }
  // //   }
  // // }),

  // Update Groups
  update_role: Joi.object({
    account_id: exports.schema.account_id.strip(),
    org_id: exports.schema.org_id.strip(),
    groups: exports.schema.groups,
    updated: exports.schema.updated,
  })
  .requiredKeys('account_id', 'org_id', 'groups'),

};

exports.indexes = [
  [ { account_id: 1 }, { unique: false, sparse: false } ],
  [ { org_id: 1 }, { unique: false, sparse: false } ],
  [ { account_id: 1, org_id: 1 }, { unique: true, sparse: false } ],
];
