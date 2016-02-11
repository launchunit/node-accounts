
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.account.verifyEmail;
});


test.serial('Account Services verifyEmail (No Arguments)', t => {

  var Input = {};

  return Fn('56bb7dbcfcd347b76bb88435', Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result._id);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services verifyEmail (Some Argument)', t => {

  var Input = {
    some: 'kevin'
  };

  return Fn('56bb7dbcfcd347b76bb88435', Input)
  .then(Result => {

    t.ok(Result.error === undefined);
    t.ok(Result.result);
    t.ok(Result.result._id);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});
