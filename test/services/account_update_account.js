
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.account.updateAccount;
});


test.serial('Account Services updateAccount (No Arguments)', t => {

  var Input = {};

  return Fn('56bb7dbcfcd347b76bb88435', Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services updateAccount (Invalid first_name)', t => {

  var Input = {
    first_name: false
  };

  return Fn('56bb7dbcfcd347b76bb88435', Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services updateAccount (Valid first_name & Invalid last_name)', t => {

  var Input = {
    first_name: 'Karan',
    last_name: false
  };

  return Fn('56bb7dbcfcd347b76bb88435', Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services updateAccount (Valid first_name & last_name)', t => {

  var Input = {
    first_name: 'Karan',
    last_name: 'Sakhuja'
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

test.serial('Account Services updateAccount (Invalid id)', t => {

  var Input = {
    first_name: 'Karan',
    last_name: 'Sakhuja'
  };

  return Fn('56bb7dbcfcd347b76bb88XXX35', Input)
  .then(Result => {
    t.ok(Result === undefined)
  })
  .catch(err => {
    t.ok(err);
    // console.log(inspect(err, { depth: null }));
  });
});

test.serial('Account Services updateAccount (id Doest Exist)', t => {

  var Input = {
    first_name: 'Karan',
    last_name: 'Sakhuja'
  };

  return Fn('56bb7dbcfcd347b76bb8843b', Input)
  .then(Result => {
    t.ok(Result === undefined)
  })
  .catch(err => {
    t.ok(err);
    // console.log(inspect(err, { depth: null }));
  });
});

test.serial('Account Services updateAccount (Invalid Email)', t => {

  var Input = {
    email: false
  };

  return Fn('56bb7dbcfcd347b76bb88435', Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services updateAccount (Same as Current Email)', t => {

  var Input = {
    email: 'kevin@gmail.com',
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

test.serial('Account Services updateAccount (Email is Used)', t => {

  var Input = {
    email: 'kevin_1455128508756@gmail.com',
  };

  return Fn('56bb7dbcfcd347b76bb88435', Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('Account Services updateAccount (Email Not Used)', t => {

  var Input = {
    email: 'kevin_new@gmail.com',
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

test.serial('Account Services updateAccount (Back to Previous, Email Not Used)', t => {

  var Input = {
    email: 'kevin@gmail.com',
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
