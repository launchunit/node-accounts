
const inspect = require('util').inspect,
  // Joi = require('joi'),
  uuid = require('node-uuid'),
  test = require('ava');


test.serial.cb('Testing Account Model (Reset_Password)', t => {

  const Actions = DB.collections.account.actions.reset_password;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 2);
  // t.ok(Result.error.details[0].path === 'reset_token');
  // t.ok(Result.error.details[1].path === 'reset_expiry');

  // Test #2
  Input = { reset_expiry: null };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 2);
  // t.ok(Result.error.details[0].path === 'reset_token');

  // Test #3
  Input = { reset_token: null };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);
  // t.ok(Result.error.details[0].path === 'reset_expiry');

  // Test #4
  Input = { reset_token: 'sdfsdf' };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 3);

  // Test #5
  Input = {
    reset_token: 'sdfsdf',
    reset_expiry: 'sdfdsf'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 3);

  // Test #6
  Input = {
    reset_token: null,
    reset_expiry: null
  };
  Result = Actions.validate(Input);
  t.ok(Result.error === null);
  t.ok(Result.value);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.reset_token === null);

  // Test #7
  Input = {
    reset_token: uuid(),
    reset_expiry: new Date()
  };
  Result = Actions.validate(Input);
  t.ok(Result.error === null);
  t.ok(Result.value);
  t.ok(Result.value.reset_expiry instanceof Date);
  t.ok(Result.value.reset_token);

  // Test #8
  Input = {
    reset_token: null,
    reset_expiry: new Date()
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #9
  Input = {
    reset_token: uuid(),
    reset_expiry: null
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Print
  // console.log(inspect(
  //   Actions.validate(Input)
  //   /* .error.details */, { depth: null } ));
  t.end();
});

test.serial.cb('Testing Account Model (Login)', t => {

  const Actions = DB.collections.account.actions.login;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #2
  Input = {
    last_login: 'sss'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #3
  Input = {
    last_login: new Date()
  };
  Result = Actions.validate(Input);
  t.ok(Result.error === null);
  t.ok(Result.value.last_login instanceof Date);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.reset_token === null);

  // // Print
  // console.log(inspect(
  //   Actions.validate(Input)
  //   /* .error.details */, { depth: null } ));

  t.end();
});

test.serial.cb('Testing Account Model (Create_Account)', t => {

  const Actions = DB.collections.account.actions.create_account;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 2);

  // Test #2
  Input = {
    email: 'sss'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 2);

  // Test #3
  Input = {
    email: 'kev@gmailcom'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #3
  Input = {
    email: 'kev@gmailcom',
    password: 'sfsdfsd',
    some: 'ssss'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #4
  Input = {
    email: 'kev@gmailcom',
    password: '6cbe615c106f422d23669b610b564800',
    some: 'ssss'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error === null);
  t.ok(Result.value.email_verified === false);
  t.ok(Result.value.active === true);
  t.ok(Result.value.reset_token === null);
  t.ok(Result.value.reset_expiry === null);
  t.ok(Result.value.created instanceof Date);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);


  // Print
  // console.log(inspect(
  //   Actions.validate(Input)
  //   /* .error.details */, { depth: null } ));

  t.end();
});

test.serial.cb('Testing Account Model (Update_Active)', t => {

  const Actions = DB.collections.account.actions.update_active;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #2
  Input = {
    active: 'sss'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #3
  Input = {
    active: false,
    some: 'blah'
  };
  Result = Actions.validate(Input);
  t.ok(Result.error === null);
  t.ok(Result.value.active === false);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);


  // Print
  console.log(inspect(
    Actions.validate(Input)
    /* .error.details */, { depth: null } ));

  t.end();
});

