
const crypto = require('crypto-js');
const oauth1a = require('oauth-1.0a');
const CONSUMERKEY = 'ck_a32eb3ceaa10ed2469cb6f510dd63d8fea6a4a12';
const CONSUMERSECRET = 'cs_0178db87fad3d08d9f3274781a18e291c8364509';

 

class Oauth1Helper {
  static getAuthHeaderForRequest(request) {
    const oauth = oauth1a({
      consumer: {key: CONSUMERKEY, secret: CONSUMERSECRET},
      signature_method: 'HMAC-SHA1',
      hash_function(base_string, key) {
        return crypto.algo.HMAC
          .create(crypto.algo.SHA1, key)
          .update(base_string)
          .finalize()
          .toString(crypto.enc.Base64);
      },
    });
    const authorization = oauth.authorize(request);

    return oauth.toHeader(authorization);
  }
}

module.exports = Oauth1Helper;