
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
   * @params {String} input.account_id (Required)
   * @params {String} input.name (Required)
   *
   * @params {String} input.description (Optional)
   * @params {Boolean} input.active (Optional Default=true)
   *
   * @private
   */
  function createOrg(input) {

    input = input || {};
    var constants = {};

    return new Promise((resolve, reject) => {

      // Validate id
      const validateId = joiHelpers.validate(objectId,
                           (input.account_id || ''));

      if (validateId.error) {
        delete validateId.value;
        return reject(validateId);
      }

      // Cast id
      input.id = db.utils.toObjectID(validateId.value);


      const validate = joiHelpers.validate(
        db.collections.org.methods.create_org, Object.assign(input, {
          created_by: input.id
        }));

      logger.debug(validate);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      // Verify created_by
      constants = validate.value;
      return resolve(db.collections.account.findOne({
        _id: input.id
      }, {
        limit: 1,
        fields: { active: 1 }
      }));
    })
    .then(user => {

      if (user && user.active === true) {
        return db.collections.org.insertOne(constants);
      }

      return promiseHelpers.reject({
        error: [{
          path: 'account_id',
          message: 'User account is not active, org was not created.'
        }]
      });

    })
    .then(result => {
      return { result: { id: result.insertedId }};
    })
    .catch(promiseHelpers.mongoDone);
  };



  /**
   * @params {String} input.id (Required)
   * @params {String} input.name (Optional)
   * @params {String} input.description (Optional)
   * @params {Boolean} input.active (Optional)
   *
   * @public
   */
  function updateOrg(input) {

    input = input || {};
    const constants = {};

    return new Promise((resolve, reject) => {

      // Validate id
      const validateId = joiHelpers.validate(objectId,
                           (input.id || ''));

      if (validateId.error) {
        delete validateId.value;
        return reject(validateId);
      }

      // Cast _id
      constants.id = db.utils.toObjectID(validateId.value);


      const validate = joiHelpers.validate(
        db.collections.org.methods.update_org, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      return resolve(db.collections.org.updateOne({
        _id: constants.id
      }, {
        $set: validate.value
      }));

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return {
          error: [{
            path: 'id',
            message: 'Org id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: constants.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  // Return
  return { createOrg, updateOrg };

};
