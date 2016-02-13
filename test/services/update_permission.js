
const inspect = require('util').inspect,
  test = require('ava');

var Fn;
test.before.serial(t => {
  Fn = Services.permission.updatePermission;
});


test.serial('updatePermission (No Arguments)', t => {

  var Input = {};

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updatePermission (No roles Argument)', t => {

  var Input = {
    id: '56bb7dbcfcd347b76bb88435'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updatePermission (No roles Argument and Invalid id)', t => {

  var Input = {
    id: '56bb7dbcfcd347b76bb8843x',
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    // console.log(inspect(Result, { depth: null }));
  });
});

test.serial('updatePermission (Valid id But Invalid roles Type)', t => {

  Input = {
    roles: 'superman org',
    id: '56be1e169368a6a5e7f5fa8d'
  };

  return Fn(Input)
  .then(Result => {

    t.ok(Result.error);
    t.ok(Result.error.length === 1);

    // Print
    console.log(inspect(Result, { depth: null }));
  });
});

// test.serial('updatePermission (Valid account_id & org_id But Invalid roles Type)', t => {

//   Input = {
//     roles: null,
//     account_id: '56be1d2a54d12187e6ee764d',
//     org_id: '56be1e169368a6a5e7f5fa8d'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('updatePermission (Valid account_id & org_id But Invalid roles)', t => {

//   Input = {
//     roles: ['superman org'],
//     account_id: '56be1d2a54d12187e6ee764d',
//     org_id: '56be1e169368a6a5e7f5fa8d'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error);
//     t.ok(Result.error.length === 1);

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });

// test.serial('updatePermission (Valid account_id, org_id & roles, But permission Exists', t => {

//   Input = {
//     roles: ['guest', 'system.admin'],
//     account_id: '56be1d2a54d12187e6ee764d',
//     org_id: '56be1e169368a6a5e7f5fa8d'
//   };

//   return Fn(Input)
//   .then(Result => {

//     t.ok(Result.error === undefined);
//     t.ok(Result.result);
//     t.ok(Result.result.id);

//     // Print
//     // console.log(inspect(Result, { depth: null }));
//   });
// });
