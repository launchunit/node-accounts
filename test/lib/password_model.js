
const inspect = require('util').inspect,
  joiHelpers = require('joi-helpers'),
  test = require('ava');


const Model = require('../../lib/password_model');


test.serial('Password Model (No Input)', t => {

  var Input = {}, Result;

  // Test #1
  Input = {};
  Result = joiHelpers.validate(Model, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Print
  // console.log(inspect(Result, { depth: null }));
});

test.serial('Password Model (Only Password But Short)', t => {

  var Input = {}, Result;

  // Test #1
  Input = {
    password: 'sss'
  };
  Result = joiHelpers.validate(Model, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 2);

  // Print
  // console.log(inspect(Result, { depth: null }));
});

test.serial('Password Model (Only Password)', t => {

  var Input = {}, Result;

  // Test #1
  Input = {
    password: 'superman'
  };
  Result = joiHelpers.validate(Model, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Print
  // console.log(inspect(Result, { depth: null }));
});

test.serial('Password Model (Password & Password Confirm Do Not Match)', t => {

  var Input = {}, Result;

  // Test #1
  Input = {
    password: 'superman',
    password_confirm: 'super'
  };
  Result = joiHelpers.validate(Model, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error));
  t.ok(Result.error.length === 1);

  // Print
  // console.log(inspect(Result, { depth: null }));
});

test.serial('Password Model (Password & Password Confirm Match)', t => {

  var Input = {}, Result;

  // Test #1
  Input = {
    password: 'superman',
    password_confirm: 'superman'
  };
  Result = joiHelpers.validate(Model, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.password_confirm === undefined);
  t.ok(Result.value.password === 'superman');

  // Print
  // console.log(inspect(Result, { depth: null }));
});
