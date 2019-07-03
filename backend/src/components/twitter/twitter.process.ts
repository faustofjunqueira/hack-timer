import { getConfig, updateConfig } from "../configuration/configuration.service";
import Twitter = require('twitter');
import config = require('config');
import { get } from 'lodash';
import { twitterGetDataByQuery } from "./twitter.service";
import logger from '../../utils/log';
import { storeMedia } from '../media/media.service';
import { createCicleFunction } from '../../utils/cicle-function';

const getTweetMedia = (tweet: any): string =>
  get(tweet, 'entities.media[0].media_url') ||
  get(tweet, 'retweeted_status.entities.media[0].media_url')


function parseTweet(tweet: any): any {
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

async function twitterFetchDataIteration(twitter: Twitter) {
  try {
    logger.info('process.twitter.it')
    const configuration = await getConfig();
    let sinceId = get(configuration, 'twitter.sinceId') as number;
    let tweetQuery = get(configuration, 'twitter.query');
    logger.info('process.twitter.it.search', { tweetQuery, sinceId });

    const tweet = await twitterGetDataByQuery(twitter, tweetQuery, sinceId);
    if (tweet && tweet.statuses && tweet.statuses.length) {
      sinceId = get(tweet, 'statuses[0].id') as number;
      const tweetParsed = tweet.statuses.map(parseTweet);
      await storeMedia(tweetParsed);
      await updateConfig('twitter.sinceId', sinceId);
      logger.info('process.twitter.stored', { count: tweet.statuses.length });
    }
    logger.info('process.twitter.it.end', { tweetQuery, sinceId });
  } catch (err) {
    console.log(err);
    logger.info('process.twitter.it.error');
  }
}

export async function twitterFetchData() {
  const configuration = await getConfig();
  logger.info('process.twitter.start');

  if (configuration && configuration.twitter && configuration.twitter.auth && configuration.twitter.auth.accessToken) {
    const twitter = new Twitter({
      consumer_key: get(configuration, 'twitter.auth.consumerKey') as string,
      consumer_secret: get(configuration, 'twitter.auth.consumerSecret') as string,
      bearer_token: get(configuration, 'twitter.auth.accessToken') as string
    });
    createCicleFunction(twitterFetchDataIteration)
      .start(config.get('twitter.time-fetch-data'), twitter);
  }
}
