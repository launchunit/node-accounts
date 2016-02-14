
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.verifyEmail;
});


test.serial('verifyEmail (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('verifyEmail (Some Argument)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764d',
    some: 'kevin'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result.id);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('verifyEmail (Invalid _id)', t => {

  var Input = {
    id: '56be1d2a54d12187e6ee764x',
    some: 'kevin'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    console.log(inspect(Result, { depth: null }));
  });
});
