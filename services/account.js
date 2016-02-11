
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
   * @params {Object} input.password (Required)
   * @params {Object} input.password_confirm (Required)
   *
   * @params {Object} input.active (Optional Default=true)
   * @params {Object} input.timezone (Optional)
   * @params {Object} input.email_verified (Optional)
   *
   * @public
   */
  function createAccount(input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      const validate = joiHelpers.validate(
        db.collections.account.methods.confirm_password, input);

      if (validate.error === null) {
        return resolve(crypto.hash(input.password));;
      }

      return reject({ error: validate.error });
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
      return { result: { _id: result.insertedId }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} input.email (Required)
   * @params {Object} input.password (Required)
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
        fields: { 'password': 1 }
      }));
    })
    .then(result => {

      logger.debug(result);

      constants._id = result._id;
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
          _id: constants._id
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
      return { result: { _id: constants._id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} _id (Required)
   *
   * @params {String} input.email (Optional)
   * @params {String} input.first_name (Optional)
   * @params {String} input.last_name (Optional)
   * @params {String} input.picture (Optional)
   * @params {String} input.bio (Optional)
   * @params {String} input.gender (Optional)
   * @params {String} input.timezone (Optional)
   *
   * @public
   */
  function updateAccount(_id, input) {

    input = input || {};

    return new Promise((resolve, reject) => {

      // Validate _id
      const validateId = joiHelpers.validate(objectId, _id);
      if (validateId.error) {
        delete validateId.value;
        return reject(new Error(validateId.error[0].message));
      }
      // Cast _id
      _id = db.utils.toObjectID(_id);


      const validate = joiHelpers.validate(
        db.collections.account.methods.update_account, input);

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      return resolve(db.collections.account.updateOne({
        _id: _id
      }, {
        $set: validate.value
      }));

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return promiseHelpers.reject(
           new Error('Id not found, nothing was updated.'));
      }

      return { result: { _id: _id }};
    })
    .catch(promiseHelpers.mongoDone);
  };


  /**
   * @params {String} _id (Required)
   *
   * @public
   */
  function verifyEmail(_id) {

    return new Promise((resolve, reject) => {

      // Validate _id
      const validateId = joiHelpers.validate(objectId, _id);
      if (validateId.error) {
        delete validateId.value;
        return reject(new Error(validateId.error[0].message));
      }
      // Cast _id
      _id = db.utils.toObjectID(_id);


      const validate = joiHelpers.validate(
        db.collections.account.methods.verify_email, {});

      // Validate
      if (validate.error) {
        delete validate.value;
        return reject(validate);
      }

      logger.debug(validate.value);

      return resolve(db.collections.account.updateOne({
        _id: _id
      }, {
        $set: validate.value
      }));

    })
    .then(result => {

      if (result.matchedCount === 0) {
        return promiseHelpers.reject(
           new Error('Id not found, nothing was updated.'));
      }

      return { result: { _id: _id }};
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
