
const inspect = require('util').inspect,
  test = require('ava');


// test.serial('Account Services createAccount (No Arguments)', t => {

//   var Input = {};
//   var Fn = Services.account.createAccount;

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 2);
//     t.ok(Result.error[0].path === 'password');
//     t.ok(Result.error[1].path === 'password_confirm');

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('Account Services createAccount (Only Password - Short Password)', t => {

//   var Input = {
//     password: 'kevin'
//   };
//   var Fn = Services.account.createAccount;

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 2);
//     t.ok(Result.error[0].path === 'password');
//     t.ok(Result.error[1].path === 'password_confirm');

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('Account Services createAccount (No Password Confirm)', t => {

//   var Input = {
//     password: 'kevin123'
//   };
//   var Fn = Services.account.createAccount;

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);
//     t.ok(Result.error[0].path === 'password_confirm');

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('Account Services createAccount (Password & Password Confirm Dont Match)', t => {

//   var Input = {
//     password: 'kevin123',
//     password_confirm: 'kevin124'
//   };
//   var Fn = Services.account.createAccount;

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);
//     t.ok(Result.error[0].path === 'password_confirm');

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });

test.serial('Account Services createAccount (Password & Password Confirm)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    // Print
    console.log(inspect(Result, { depth: null }));
  });
});

