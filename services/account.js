
'use strict';

/**
 * Module dependencies.
 * @private
 */
const joiHelpers = require('joi-helpers'),
  crypto = require('../lib/crypto'),
  promiseHelpers = require('promise-helpers'),
  objectId = joiHelpers.objectId();


module.exports = db => {

  /**
   * @params {String} input.email (Required)
   * @params {String} input.password (Required)
   * @params {String} input.password_confirm (Required)
   *
   * @params {Boolean} input.active (Optional Default=true)
   * @params {String} input.timezone (Optional)
   * @params {Boolean} input.email_verified (Optional)
   *
   * @public
   */
  function createAccount(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        db.collections.account.methods.confirm_password, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      return resolve(crypto.hash(input.password));;
    })
    .then(hashedPassword => {

      const Input = Object.assign({}, input, {
        password: hashedPassword
      });

      const validate = joiHelpers.validate(
        db.collections.account.methods.create_account,
        Input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return promiseHelpers.reject(validate);
      }

      logger.debug(Input);
      logger.debug(validate.value);

      return db.collections.account.insertOne(validate.value);
    })
    .then(result => {
      return { result: { id: result.insertedId }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.email (Required)
   * @params {String} input.password (Required)
   *
   * @public
   */
  function login(input) {

    input = input || {};
    var constants = {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        db.collections.account.methods.login,
        input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      return resolve(db.collections.account.findOne({
        email: validate.value.email
      }, {
        fields: { 'password': 1, active: 1 }
      }));
    })
    .then(result => {

      // ToDo:
      // Deal with an Inactive Account

      logger.debug(result);

      constants.id = result._id;
      return crypto.compare(input.password, result.password);
    })
    .then(passwordMatch => {

      if (passwordMatch === true) {

        // Update Login Things
        const validate = joiHelpers.validate(
          db.collections.account.methods.update_login, {});

        // Validate
        if (validate.error) {
          delete validate.value;
          return promiseHelpers.reject(validate);
        }

        logger.debug(validate.value);

        return db.collections.account.updateOne({
          id: constants.id
        }, {
          $set: validate.value
        });
      }

      return promiseHelpers.reject({ error: [{
        path: 'password',
        message: 'Invalid email/password.'
      }]});

    })
    .then(result => {
      return { result: { id: constants.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.id (Required)
   * @params {String} input.email (Optional)
   * @params {Boolean} input.active (Optional)
   * @params {String} input.first_name (Optional)
   * @params {String} input.last_name (Optional)
   * @params {String} input.picture (Optional)
   * @params {String} input.bio (Optional)
   * @params {String} input.gender (Optional)
   * @params {String} input.timezone (Optional)
   *
   * @public
   */
  function updateAccount(input) {

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

      // Cast id
      constants.id = db.utils.toObjectID(validateId.value);


      const validate = joiHelpers.validate(
        db.collections.account.methods.update_account, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      return resolve(db.collections.account.updateOne({
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
            message: 'Id not found, nothing was updated.'
          }]
        };
      }

      return { result: { id: constants.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.id (Required)
   *
   * @public
   */
  function verifyEmail(input) {

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

      // Cast id
      constants.id = db.utils.toObjectID(validateId.value);


      const validate = joiHelpers.validate(
        db.collections.account.methods.verify_email, {});

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      return resolve(db.collections.account.updateOne({
        _id: constants.id
      }, {
        $set: validate.value
      }));

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return promiseHelpers.reject(
           new Error('Id not found, nothing was updated.'));
      }

      return { result: { id: constants.id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  // Return
  return {
    createAccount,
    login,
    updateAccount,
    verifyEmail
  };

};
