import request = require("request");
import Twitter = require("twitter");

export async function twitterAuth(consumerKey, consumerSecret): Promise<{ token_type: string, access_token: string }> {
  return new Promise((resolve, reject) => {
    const options = {
      url: "https://api.twitter.com/oauth2/token",
      method: "POST",
      auth: {
        user: consumerKey,
        pass: consumerSecret
      },
      form: {
        grant_type: 'client_credentials'
      }
    };

    request(options, (err, httpResponse, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });

  });
}

export async function twitterSearch(twitter: Twitter, params: Twitter.RequestParams): Promise<Twitter.ResponseData> {
  return twitter.get('/search/tweets.json', params);
}