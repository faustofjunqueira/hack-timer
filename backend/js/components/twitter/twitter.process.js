"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_service_1 = require("../configuration/configuration.service");
const Twitter = require("twitter");
const config = require("config");
const lodash_1 = require("lodash");
const twitter_service_1 = require("./twitter.service");
const log_1 = require("../../utils/log");
const media_service_1 = require("../media/media.service");
const cicle_function_1 = require("../../utils/cicle-function");
const getTweetMedia = (tweet) => lodash_1.get(tweet, 'entities.media[0].media_url') ||
    lodash_1.get(tweet, 'retweeted_status.entities.media[0].media_url');
function parseTweet(tweet) {
    return {
        date: new Date(tweet.created_at),
        profile: {
            name: tweet.user.screen_name,
            media: tweet.user.profile_image_url,
            id: tweet.user.id_str
        },
        id: tweet.id_str,
        text: tweet.text,
        media: getTweetMedia(tweet)
    };
}
async function twitterFetchDataIteration(twitter) {
    try {
        log_1.default.info('process.twitter.it');
        const configuration = await configuration_service_1.getConfig();
        let sinceId = lodash_1.get(configuration, 'twitter.sinceId');
        let tweetQuery = lodash_1.get(configuration, 'twitter.query');
        log_1.default.info('process.twitter.it.search', { tweetQuery, sinceId });
        const tweet = await twitter_service_1.twitterGetDataByQuery(twitter, tweetQuery, sinceId);
        if (tweet && tweet.statuses && tweet.statuses.length) {
            sinceId = lodash_1.get(tweet, 'statuses[0].id');
            const tweetParsed = tweet.statuses.map(parseTweet);
            await media_service_1.storeMedia(tweetParsed);
            await configuration_service_1.updateConfig('twitter.sinceId', sinceId);
            log_1.default.info('process.twitter.stored', { count: tweet.statuses.length });
        }
        log_1.default.info('process.twitter.it.end', { tweetQuery, sinceId });
    }
    catch (err) {
        console.log(err);
        log_1.default.info('process.twitter.it.error');
    }
}
async function twitterFetchData() {
    const configuration = await configuration_service_1.getConfig();
    log_1.default.info('process.twitter.start');
    if (configuration && configuration.twitter && configuration.twitter.auth && configuration.twitter.auth.accessToken) {
        const twitter = new Twitter({
            consumer_key: lodash_1.get(configuration, 'twitter.auth.consumerKey'),
            consumer_secret: lodash_1.get(configuration, 'twitter.auth.consumerSecret'),
            bearer_token: lodash_1.get(configuration, 'twitter.auth.accessToken')
        });
        cicle_function_1.createCicleFunction(twitterFetchDataIteration)
            .start(config.get('twitter.time-fetch-data'), twitter);
    }
}
exports.twitterFetchData = twitterFetchData;
