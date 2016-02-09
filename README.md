# node-accounts

----

## Usage

```js
const Accounts = require('node-accounts');

/**
 * @params {Db Instance} opts.db (Required)
 * @params {Object} opts.logger (Optional)
 *
 * @return {Promise}
 * @public
 */
Accounts({
  db: db
})
.then(function(services) {
  console.log(services);
})
.catch(function(e) {
  console.log(e);
});
```

#### Built-In-Roles

```js
{
  system: {
    owner: true,
    admin: true,
    member: true,
    guest: true,
  },
  org: {
    owner: true,
    admin: true,
    billing: true,
    manager: true,
    member: true,
    guest: true,
  },
  member: true,
  guest: true,
};
```

------

#### Run Tests

```bash
$ npm test

# OR for continuous testing
$ nodemon --exec "npm test"
```
