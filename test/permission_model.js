
const inspect = require('util').inspect,
  joiHelpers = require('joi-helpers'),
  test = require('ava');


// test.serial.cb('Testing Permission Model (Create_Permission)', t => {

//   const Method = DB.collections.permission.methods.create_permission;
//   var Input = {}, Result;


//   // Test #1
//   Input = {};
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 3);

//   // Test #2
//   Input = {
//     account_id: 'sss'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 3);

//   // Test #3
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #4
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: 'ssfsdfsd'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #5
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: []
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #6
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: ['super']
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #6
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: ['member', 'system.owner'],
//     some: 'blah'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.account_id === '56883c825a03cb66533a1781');
//   t.ok(Result.value.org_id === '56883c825a03cb66533a1781');
//   t.ok(Array.isArray(Result.value.roles));
//   t.ok(Result.value.created instanceof Date);
//   t.ok(Result.value.updated instanceof Date);
//   t.ok(Result.value.some === undefined);

//   // Print
//   console.log(inspect(Result, { depth: null }));

//   t.end();
// });

// test.serial.cb('Testing Permission Model (Update_Roles)', t => {

//   const Method = DB.collections.permission.methods.update_roles;
//   var Input = {}, Result;


//   // Test #1
//   Input = {};
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 3);

//   // Test #2
//   Input = {
//     account_id: 'sss'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 3);

//   // Test #3
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #4
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: 'ssfsdfsd'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #5
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: []
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #6
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: ['super']
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error);
//   t.ok(Array.isArray(Result.error.details));
//   t.ok(Result.error.details.length === 1);

//   // Test #6
//   Input = {
//     account_id: '56883c825a03cb66533a1781',
//     org_id: '56883c825a03cb66533a1781',
//     roles: ['member', 'system.owner'],
//     some: 'blah'
//   };
//   Result = joiHelpers.validate(Method, Input)
//   t.ok(Result.error === null);
//   t.ok(Result.value.account_id === undefined);
//   t.ok(Result.value.org_id === undefined);
//   t.ok(Array.isArray(Result.value.roles));
//   t.ok(Result.value.updated instanceof Date);
//   t.ok(Result.value.some === undefined);

//   // Print
//   console.log(inspect(Result, { depth: null }));

//   t.end();
// });

test.serial.cb('Testing Permission Model (Update_Groups)', t => {

  const Method = DB.collections.permission.methods.update_groups;
  var Input = {}, Result;


  // Test #1
  Input = {};
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 3);

  // Test #2
  Input = {
    account_id: 'sss'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 3);

  // Test #3
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #4
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    groups: 'ssfsdfsd'
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #5
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    groups: []
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #6
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    groups: ['super']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #7
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    groups: ['56883c825a03cb66533a1781', '56883c825a03cb66533a1781']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error);
  t.ok(Array.isArray(Result.error.details));
  t.ok(Result.error.details.length === 1);

  // Test #8
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    groups: ['56883c825a03cb66533a1781', 'sssss']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.account_id === undefined);
  t.ok(Result.value.org_id === undefined);
  t.ok(Array.isArray(Result.value.groups));
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.some === undefined);


  // Test #8
  Input = {
    account_id: '56883c825a03cb66533a1781',
    org_id: '56883c825a03cb66533a1781',
    groups: ['56883c825a03cb66533a1781', 'sssss'],
    roles: ['member']
  };
  Result = joiHelpers.validate(Method, Input)
  t.ok(Result.error === null);
  t.ok(Result.value.account_id === undefined);
  t.ok(Result.value.org_id === undefined);
  t.ok(Array.isArray(Result.value.groups));
  t.ok(Result.value.updated instanceof Date);
  t.ok(Result.value.roles === undefined);


  // Print
  console.log(inspect(Result, { depth: null }));

  t.end();
});