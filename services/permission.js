
'use strict';

/**
 * Module dependencies.
 * @private
 */
const joiHelpers = require('joi-helpers'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId();


module.exports = db => {

  /**
   * @params {ObjectId} input.id (Required)
   * @params {Array} input.roles (Required)
   * @params {Array} input.removeRoles (Optional)
   *
   * @private
   */
  function updateRoles(input) {

    // Case Id for Extra Error Protection
    input.id = db.utils.toObjectID(input.id);

    return new Promise((resolve, reject) => {

      // Validate id
      const validateId = joiHelpers.validate(objectId,
                           (input.id || ''));

      if (validateId.error) {
        delete validateId.value;
        return reject(validateId);
      }

      // For Deleting the Permission
      if (input.roles === null) {
        return resolve(db.collections.permission.remove({
          _id: input.id,
        }, {
          justOne: true,
        }));
      }

      // Find the Permission First
      return resolve(db.collections.permission.findOne({
        _id: input.id,
      }, {
        fields: { roles: 1 }
      }));
    })
    .then(result => {

      // This is From Remove Operation
      if (result.ok) {
        return promiseHelpers.resolve(result);
      }

      // Permission is Found
      else if (result) {

        var updaterObj;

        // Roles Already Exists
        if (Array.isArray(result.roles)) {

          updaterObj = input.removeRoles === true
            // Remove from Set
            ? { $pullAll: { roles: input.roles } }
            // Add to Set
            : { $addToSet: { roles: { $each: input.roles } } };
        }

        else {
          updaterObj = input.removeRoles === true
            ? { $set: { roles: [] } }
            : { $set: { roles: input.roles } };
        }

        return db.collections.permission.updateOne({
          _id: input.id
        }, updaterObj);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'id',
          message: 'Permission id not found, nothing was updated.'
        }]
      });

    });
  };


  /**
   * @params {String} input.account_id (Required)
   * @params {String} input.org_id (Required)
   * @params {Array} input.roles (Required)
   * @params {Array} input.groups (Optional)
   *
   * @public
   */
  function createPermission(input) {

    input = input || {};
    var constants = {};
    var permission_id;

    return new Promise((resolve, reject) => {

      // Validate id
      const validateId = joiHelpers.validate(objectId,
                           (input.account_id || ''));

      if (validateId.error) {
        delete validateId.value;
        return reject(validateId);
      }

      // Validate org_id
      const validateOrgId = joiHelpers.validate(objectId,
                           (input.org_id || ''));

      if (validateOrgId.error) {
        delete validateOrgId.value;
        return reject(validateOrgId);
      }

      // Cast _id & org_id
      input.account_id = db.utils.toObjectID(validateId.value);
      input.org_id = db.utils.toObjectID(validateOrgId.value);


      const validate = joiHelpers.validate(
        db.collections.permission.methods.create_permission, Object.assign(input, {
          account_id: input.account_id,
          org_id: input.org_id
        }));

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);
      constants = validate.value;

      return resolve(Promise.all([

        // Verify created_by
        db.collections.account.findOne({
          _id: input.account_id
        }, {
          fields: { active: 1 }
        }),

        // Verify org_id
        db.collections.org.findOne({
          _id: input.org_id
        }, {
          fields: { active: 1 }
        }),

        // Check if account_id & org_id exists
        db.collections.permission.findOne({
          account_id: input.account_id,
          org_id: input.org_id
        }, {
          fields: { _id: 1 }
        })
      ]));

    })
    .then(results => {

      // Permission Doesnt Exist
      if (results[2] === null) {

        if (results[0] && results[0].active === true &&
            results[1] && results[1].active === true) {

          return db.collections.permission.insertOne(constants);
        }

        else {
          return promiseHelpers.reject({
            error: [{
              path: 'account_id',
              message: 'Either user account or org is not active, permission was not created.'
            }]
          });
        }
      }

      // Permission Exists, Update Roles & Group

      // Globally Storing permission_id
      permission_id = results[2]._id;

      return Promise.all([
        updateRoles({
          id: results[2]._id,
          roles: constants.roles,
        }),
        // updateRoles({
        //   id: results[2]._id,
        //   groups: constants.groups,
        // }),
      ]);

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return {
          error: [{
            path: 'id',
            message: 'Permission id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: result.insertedId || permission_id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.id (Required)
   * @params {Array|null} input.roles (Optional)
   * @params {Array} input.groups (Optional)
   *
   * @public
   */
  function updatePermission(input) {

    input = input || {};
    var constants = {};

    return new Promise((resolve, reject) => {

      // Validate id
      const validateId = joiHelpers.validate(objectId,
                           (input.id || ''));

      if (validateId.error) {
        delete validateId.value;
        return reject(validateId);
      }

      // Cast id
      input.id = db.utils.toObjectID(validateId.value);

      const validate = joiHelpers.validate(
        db.collections.permission.methods.update_permission, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      constants = validate.value;
      logger.debug(validate.value);

        // Check if account_id & org_id exists
      return resolve(db.collections.permission.findOne({
          _id: input.id
        }, {
          fields: { account_id: 1, org_id: 1 }
        }));

    })
    .then(result => {

      if (result && result.account_id && result.org_id) {

        return Promise.all([

          // Verify account_id
          db.collections.account.findOne({
            _id: result.account_id
          }, {
            fields: { active: 1 }
          }),

          // Verify org_id
          db.collections.org.findOne({
            _id: input.org_id
          }, {
            fields: { active: 1 }
          })
        ]);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'id',
          message: 'Permission id not found, nothing was updated.'
        }]
      });

    })
    .then(results => {

      if (results[0] && results[0].active === true &&
          results[1] && results[1].active === true) {

        return Promise.all([
          updateRoles({
            id: input.id,
            roles: constants.roles,
          }),
          // updateRoles({
          //   id: results[2]._id,
          //   groups: constants.groups,
          // }),
        ]);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'account_id',
          message: 'Either user account or org is not active, permission was not created.'
        }]
      });

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return {
          error: [{
            path: 'id',
            message: 'Permission id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: input.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  // Return
  return { createPermission, updatePermission };

};
