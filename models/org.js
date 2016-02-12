
'use strict';

/**
 * Module dependencies.
 * @private
 */
const Joi = require('joi'),
  joiHelpers = require('joi-helpers');


/**
 * Org Model
 */
exports.name = 'org';

exports.schema = {

  // Basics
  name: Joi.string().trim().label('Org Name'),
  description: Joi.string().trim(),

  // Meta
  active: Joi.boolean(),

  // Keys
  created_by: joiHelpers.objectId(),

  // Book-keeping
  created: Joi.date().min('now').default(new Date),
  updated: Joi.date().min('now').default(new Date)
};

exports.methods = {

  // Create New Org
  create_org: Joi.object({
    name: exports.schema.name,
    description: exports.schema.description,
    created_by: exports.schema.created_by,
    active: exports.schema.active.default(true),
    created: exports.schema.created,
    updated: exports.schema.updated
  })
  .requiredKeys('name', 'created_by'),

  // Update Org
  update_org: Joi.object({
    name: exports.schema.name,
    description: exports.schema.description,
    active: exports.schema.active,
    updated: exports.schema.updated,
  })
  .min(2)
  .options({
    language: {
      object: {
        min: '!!Org object must have at least 1 field to update.',
      }
    }
  }),

};

exports.indexes = [
  [ { created_by: 1 }, { unique: false, sparse: false } ],
];
