
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
  name: Joi.string().trim().label('Group Name'),
  description: Joi.string().trim(),

  // Meta
  active: Joi.boolean().default(true),

  // Keys
  org_id: joiHelpers.objectId(),
  created_by: joiHelpers.objectId(),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Group
  create_group: Joi.object({
    name: exports.schema.name,
    description: exports.schema.description,
    org_id:  exports.schema.org_id,
    created_by: exports.schema.created_by,
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

  // Update Group
  update_group: Joi.object({
    name: exports.schema.name,
    description: exports.schema.description,
    updated: exports.schema.updated,
  })
  .min(2)
  .options({
    language: {
      object: {
        min: '!!Must have at least 1 field to update.',
      }
    }
  }),

};

exports.indexes = [
  [ { org_id: 1 }, { unique: false, sparse: false } ],
  [ { org_id: 1, created_by: 1 }, { unique: true, sparse: false } ],
];
