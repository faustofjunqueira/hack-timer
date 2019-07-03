// const Twitter = require('twitter');

// var twitterClient = new Twitter({
//   consumer_key: 'egGPjeJGoxQkGggc7VT4w0DLE',
//   consumer_secret: 'UV78z8hTCMjBbMicBHGKfO0XCfTM1ZzFTx2UswhRgnIvWKRMQu',
//   bearer_token: 'AAAAAAAAAAAAAAAAAAAAAL7p%2FAAAAAAAsucRrbleP%2BE53GIlCDuXBRjhjlo%3DkfnADF1BV5I3sHdwPXWLWdUdJUVLm9D376WzP4oCvF0FmosNkz'
// });

// twitterClient.get('/search/tweets.json', { result_type: "recent", q: '#zwift' })
//   .then(console.log, console.log);

const request = require("request");

async function twitterAuth(consumer_key, consumer_secret) {
  return new Promise((resolve, reject) => {
    const options = {
      url: "https://api.twitter.com/oauth2/token",
      method: "POST",
      auth: {
        user: consumer_key,
        pass: consumer_secret
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

twitterAuth('egGPjeJGoxQkGggc7VT4w0DLE', 'UV78z8hTCMjBbMicBHGKfO0XCfTM1ZzFTx2UswhRgnIvWKRMQu')
  .then(console.log, console.log);