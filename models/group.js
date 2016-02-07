
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Joi = require('joi'),
  joiHelpers = require('joi-helpers');


/**
 * Group Model
 */
exports.name = 'group';

exports.schema = {

  // Basics
  name: Joi.string().trim().min(1),
  description: Joi.string().trim().min(1).default(''),

  // Meta
  active: Joi.boolean().default(true),

  // Keys
  created_by: Joi.string().regex(/^[0-9a-fA-F]{24}$/),
  org_id: Joi.string().regex(/^[0-9a-fA-F]{24}$/),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Group
  create_account: Joi.object({
    name: exports.schema.name,
    description: exports.schema.description,
    created_by: exports.schema.created_by,
    org_id:  exports.schema.org_id,
    active: exports.schema.active,
    created: exports.schema.created,
    updated: exports.schema.updated
  })
  .requiredKeys('name', 'created_by', 'org_id'),

  // Update Group Active
  update_active: Joi.object({
    active: exports.schema.active,
    updated: exports.schema.updated,
  })
  .requiredKeys('active'),

};

exports.indexes = [
  [ { org_id: 1 }, { unique: false, sparse: false } ],
  [ { org_id: 1, created_by: 1 }, { unique: true, sparse: false } ],
];
