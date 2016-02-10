
const inspect = require('util').inspect,
  test = require('ava');


test.serial('Account Services createAccount (No Arguments)', t => {

  var Input = {};
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 2);
    t.ok(Result.error[0].path === 'password');
    t.ok(Result.error[1].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (Only Password - Short Password)', t => {

  var Input = {
    password: 'kevin'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 2);
    t.ok(Result.error[0].path === 'password');
    t.ok(Result.error[1].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (No Password Confirm)', t => {

  var Input = {
    password: 'kevin123'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (Password & Password Confirm Dont Match)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin124'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'password_confirm');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (Password & Password Confirm Match But No Email)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'email');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (Password & Password Confirm Match and Invalid Email)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: 'kat@gmailcom'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'email');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (Password & Password Confirm Match and Valid Email, But Already Exists)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: 'kevin@gmail.com'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'email');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (Password & Password Confirm Match and Valid Email)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: `kevin_${Date.now()}@gmail.com`
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result._id);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services createAccount (Invalid Timezone)', t => {

  var Input = {
    password: 'kevin123',
    password_confirm: 'kevin123',
    email: `kevin_${Date.now()}@gmail.com`,
    timezone: 'blaasss'
  };
  var Fn = Services.account.createAccount;

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);
    t.ok(Result.error[0].path === 'timezone');

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});
