
'use strict';

/**
 * Module dependencies.
 * @private
 */
const deepFreeze = require('deep-freeze'),
  Iron = require('iron');


/**
 * Constants
 */
const SESSION_HEADER = 'X-Session-Token';

const HMAC_OPTS = deepFreeze({
  encryption: {
    saltBits: 256,
    algorithm: 'aes-256-cbc',
    iterations: 1,
    minPasswordlength: 32
  },
  integrity: {
    saltBits: 256,
    algorithm: 'sha256',
    iterations: 1,
    minPasswordlength: 32
  },
  ttl: 0,
  timestampSkewSec: 60,
  localtimeOffsetMsec: 0
});


/**
 * @params {String} input.id (Required)
 * @params {String} input.org_id (Required)
 * @params {String} HAMC (Required)
 *
 * @private
 */
exports.seal = (input, HMAC) => {

  return new Promise((resolve, reject) => {

    const Data = {
      i: input.id.toString(),
      o: input.org_id.toString()
    };

    Iron.seal(Data, HMAC, HMAC_OPTS, (err, sealed) => {
      if (err) return reject(err);
      return resolve(sealed);
    });
  });
};


/**
 * @params {String} token
 * @params {String} HAMC
 *
 * @private
 */
exports.unseal = (token, HMAC) => {

  return new Promise((resolve, reject) => {

    Iron.unseal(token.toString(), HMAC, HMAC_OPTS, (err, unsealed) => {

      if (err) logger.error(err);;

      if (unsealed && unsealed.i && unsealed.o) {
        return resolve({ id: unsealed.i, org_id: unsealed.o });
      }

      return resolve(false);
    });
  });
};
