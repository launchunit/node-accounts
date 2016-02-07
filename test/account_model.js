
const inspect = require('util').inspect,
  joiHelpers = require('joi-helpers'),
  uuid = require('node-uuid'),
  test = require('ava');


// test.serial.cb('Testing Account Model (Reset_Password)', t => {

//   const Actions = DB.collections.account.actions.reset_password;
//   var Input = {}, Result;


//   // Test #1
//   Input = {};
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 2);
//   t.ok(Result.error.details[0].path === 'reset_token');
//   t.ok(Result.error.details[1].path === 'reset_expiry');

//   // Test #2
//   Input = { reset_expiry: null };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 2);
//   t.ok(Result.error.details[0].path === 'reset_token');

//   // Test #3
//   Input = { reset_token: null };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);
//   t.ok(Result.error.details[0].path === 'reset_expiry');

//   // Test #4
//   Input = { reset_token: 'sdfsdf' };
//   Result = joiHelpers.validate(Actions, Input);
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 2);

//   // Test #5
//   Input = {
//     reset_token: 'sdfsdf',
//     reset_expiry: 'sdfdsf'
//   };
//   Result = joiHelpers.validate(Actions, Input);
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 2);

//   // Test #6
//   Input = {
//     reset_token: null,
//     reset_expiry: null
//   };
//   Result = joiHelpers.validate(Actions, Input);
//   t.ok(Result.error === null);
//   t.ok(Result.value);
//   t.ok(Result.value.reset_expiry === null);
//   t.ok(Result.value.reset_token === null);

//   // Test #7
//   Input = {
//     reset_token: uuid(),
//     reset_expiry: new Date()
//   };
//   Result = joiHelpers.validate(Actions, Input);
//   t.ok(Result.error === null);
//   t.ok(Result.value);
//   t.ok(Result.value.reset_expiry instanceof Date);
//   t.ok(Result.value.reset_token);

//   // Test #8
//   Input = {
//     reset_token: null,
//     reset_expiry: new Date()
//   };
//   Result = joiHelpers.validate(Actions, Input);
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #9
//   Input = {
//     reset_token: uuid(),
//     reset_expiry: null
//   };
//   Result = joiHelpers.validate(Actions, Input);
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Print
//   // console.log(inspect(Result, { depth: null }));
//   t.end();
// });

// test.serial.cb('Testing Account Model (Login)', t => {

//   const Actions = DB.collections.account.actions.login;
//   var Input = {}, Result;


//   // Test #1
//   Input = {};
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.last_login instanceof Date);
//   t.ok(Result.value.reset_expiry === null);
//   t.ok(Result.value.reset_token === null);

//   // Test #2
//   Input = {
//     last_login: 'sss'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #3
//   Input = {
//     last_login: new Date()
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.last_login instanceof Date);
//   t.ok(Result.value.reset_expiry === null);
//   t.ok(Result.value.reset_token === null);

//   // Print
//   // console.log(inspect(Result, { depth: null }));

//   t.end();
// });

// test.serial.cb('Testing Account Model (Create_Account)', t => {

//   const Actions = DB.collections.account.actions.create_account;
//   var Input = {}, Result;


//   // Test #1
//   Input = {};
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 2);

//   // Test #2
//   Input = {
//     email: 'sss'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 2);

//   // Test #3
//   Input = {
//     email: 'kev@gmailcom'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #4
//   Input = {
//     email: 'kev@gmailcom',
//     password: 'sfsdfsd',
//     some: 'ssss'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #5
//   Input = {
//     email: 'kev@gmailcom',
//     password: '6cbe615c106f422d23669b610b564800',
//     some: 'ssss'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.email_verified === false);
//   t.ok(Result.value.active === true);
//   t.ok(Result.value.reset_token === null);
//   t.ok(Result.value.reset_expiry === null);
//   t.ok(Result.value.created instanceof Date);
//   t.ok(Result.value.updated instanceof Date);
//   t.ok(Result.value.some === undefined);
//   t.ok(Result.value.timezone === 'america/new_york');

//   // Test #6
//   Input = {
//     email: 'kev@gmailcom',
//     password: '6cbe615c106f422d23669b610b564800',
//     some: 'ssss',
//     timezone: 'blah'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #6
//   Input = {
//     email: 'kev@gmailcom',
//     password: '6cbe615c106f422d23669b610b564800',
//     some: 'ssss',
//     timezone: 'america/phoenix    '
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.email_verified === false);
//   t.ok(Result.value.active === true);
//   t.ok(Result.value.reset_token === null);
//   t.ok(Result.value.reset_expiry === null);
//   t.ok(Result.value.created instanceof Date);
//   t.ok(Result.value.updated instanceof Date);
//   t.ok(Result.value.some === undefined);
//   t.ok(Result.value.timezone === 'america/phoenix');

//   // Print
//   console.log(inspect(Result, { depth: null }));

//   t.end();
// });

// test.serial.cb('Testing Account Model (Update_Active)', t => {

//   const Actions = DB.collections.account.actions.update_active;
//   var Input = {}, Result;


//   // Test #1
//   Input = {};
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #2
//   Input = {
//     active: 'sss'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #3
//   Input = {
//     active: false,
//     some: 'blah'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.active === false);
//   t.ok(Result.value.updated instanceof Date);
//   t.ok(Result.value.some === undefined);


//   // Print
//   console.log(inspect(Result, { depth: null }));

//   t.end();
// });

test.serial.cb('Testing Account Model (Profile)', t => {

  const Actions = DB.collections.account.actions.profile;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Actions, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #2
  Input = {
    active: 'sss'
  };
  Result = joiHelpers.validate(Actions, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #3
  Input = {
    first_name: false,
  };
  Result = joiHelpers.validate(Actions, Input)
  t.ok(Result.error);
  t.ok(Result.error.details.length === 1);

  // Test #4
  Input = {
    first_name: '',
  };
  Result = joiHelpers.validate(Actions, Input)
  t.ok(Result.error);
  t.ok(Result.error.details.length === 1);

  // Test #5
  Input = {
    first_name: '',
    last_name: false
  };
  Result = joiHelpers.validate(Actions, Input)
  t.ok(Result.error);
  t.ok(Result.error.details.length === 2);

  // Test #6
  Input = {
    first_name: '',
    last_name: ''
  };
  Result = joiHelpers.validate(Actions, Input)
  t.ok(Result.error);
  t.ok(Result.error.details.length === 2);

  // Test #7
  Input = {
    first_name: 'Karan',
  };
  Result = joiHelpers.validate(Actions, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.first_name);

//   // Test #8
//   Input = {
//     first_name: 'Karan',
//     last_name: ''
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Result.error.details.length === 1);

//   // Test #9
//   Input = {
//     first_name: 'Karan',
//     last_name: ''
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Result.error.details.length === 1);

//   // Test #10
//   Input = {
//     gender: 'sssss'
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error);
//   t.ok(Result.error.details.length === 1);

//   // Test #11
//   Input = {
//     gender: 'Male '
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.updated instanceof Date);
//   t.ok(Result.value.gender === 'male');

//   // Test #12
//   Input = {
//     timezone: 'Karan',
//   };
//   Result = joiHelpers.validate(Actions, Input)
//   // // t.ok(Result.error === null);
//   // t.ok(Result.value.updated instanceof Date);
//   // t.ok(Result.value.first_name);


  // Print
  console.log(inspect(Result, { depth: null }));

  t.end();
});
