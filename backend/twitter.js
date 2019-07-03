const Twitter = require('twitter');

const twitterClient = new Twitter({
  consumer_key: 'egGPjeJGoxQkGggc7VT4w0DLE',
  consumer_secret: 'UV78z8hTCMjBbMicBHGKfO0XCfTM1ZzFTx2UswhRgnIvWKRMQu',
  bearer_token: 'AAAAAAAAAAAAAAAAAAAAAL7p%2FAAAAAAAsucRrbleP%2BE53GIlCDuXBRjhjlo%3DkfnADF1BV5I3sHdwPXWLWdUdJUVLm9D376WzP4oCvF0FmosNkz'
});

twitterClient.get('/search/tweets.json', { result_type: "recent", q: '#hackathonradix', since_id: 1146377111499878400 })
  .then(console.log, console.log);
