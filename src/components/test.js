import OAuth from 'oauth-1.0a';
import hmacSHA1 from 'crypto-js/hmac-sha1';
import encBase64 from 'crypto-js/enc-base64';
import axios from 'axios';

const oauth = OAuth({
  consumer: {
    key: '1755966712363589632-LMUVkoF07VaJXlT7ptUfDcfMVje1QK',
    secret: 'dR3rYKdjsKpknVFgWy9DwdM7ngN6B5hucZ7BzebUq3nB8'
  },
  signature_method: 'HMAC-SHA1',
  hash_function(base_string, key) {
    return encBase64.stringify(hmacSHA1(base_string, key));
  }
});

export function getRequestToken() {
  return new Promise((resolve, reject) => {
    axios.post('https://api.twitter.com/oauth/request_token', {
      headers: oauth.toHeader(oauth.authorize({
        url: 'https://api.twitter.com/oauth/request_token',
        method: 'POST'
      }))
    })
      .then(response => {
        const data = new URLSearchParams(response.data);
        const oauth_token = data.get('oauth_token');
        const oauth_token_secret = data.get('oauth_token_secret');
        resolve({ oauth_token, oauth_token_secret });
      })
      .catch(error => {
        reject(error);
      });
  });
}

export function getAccessToken(oauth_token, oauth_token_secret, verifier) {
  return new Promise((resolve, reject) => {
    axios.post('https://api.twitter.com/oauth/access_token', {
      headers: oauth.toHeader(oauth.authorize({
        url: 'https://api.twitter.com/oauth/access_token',
        method: 'POST',
        data: { oauth_token, oauth_token_secret, verifier }
      }))
    })
      .then(response => {
        const data = new URLSearchParams(response.data);
        const access_token = data.get('oauth_token');
        const access_token_secret = data.get('oauth_token_secret');
        resolve({ access_token, access_token_secret });
      })
      .catch(error => {
        reject(error);
      });
  });
}
