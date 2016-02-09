
'use strict';

/**
 * Module dependencies.
 * @private
 */
const _ = require('lodash'),
  Joi = require('joi'),
  joiHelpers = require('joi-helpers'),
  Roles = require('../lib/roles').roles;


/**
 * Permission Model
 */
exports.name = 'permission';

exports.schema = {

  // Basics
  account_id: joiHelpers.objectId(),

  org_id: joiHelpers.objectId(),

  roles: Joi.array().unique().sparse(false).min(1)
            .items(Joi.string().valid(Roles))
            .options({
              language: { array: {
                base: '{{key}} must be an array.',
              }}
            }),

  groups: Joi.array().unique().sparse(false).min(1)
             .items(joiHelpers.objectId())
            .options({
              language: { array: {
                base: '{{key}} must be an array.',
              }}
            }),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Permission
  create_permission: Joi.object({
    account_id: exports.schema.account_id,
    org_id: exports.schema.org_id,
    roles: exports.schema.roles,
    groups: exports.schema.groups,
    created: exports.schema.created,
    updated: exports.schema.updated,
  })
  .requiredKeys('account_id', 'org_id', 'roles'),

  // Update Roles
  update_roles: Joi.object({
    account_id: exports.schema.account_id.strip(),
    org_id: exports.schema.org_id.strip(),
    roles: exports.schema.roles,
    updated: exports.schema.updated,
  })
  .requiredKeys('account_id', 'org_id', 'roles'),

  // Update Groups
  update_groups: Joi.object({
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
