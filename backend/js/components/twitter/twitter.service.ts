import { Request, Response, Router, Application } from "express";
import * as api from "./twitter.api";
import { updateConfig } from "../configuration/configuration.service";
import Twitter = require('twitter');

export async function twitterGrantAccessToken(req: Request, res: Response) {
  try {
    const { consumerKey, consumerSecret } = req.body;
    const { access_token } = await api.twitterAuth(consumerKey, consumerSecret);

    const config = await updateConfig('twitter.auth', {
      consumerKey, consumerSecret,
      accessToken: access_token
    });
    res.json(config);
  } catch (e) {
    res.send(e).status(500);
  }
}

export async function twitterStoreQuery(req: Request, res: Response) {
  try {
    const { query } = req.body;
    const config = await updateConfig('twitter.query', query);
    res.json(config);
  } catch (e) {
    res.send(e).status(500);
  }
}

export async function twitterGetDataByQuery(client: Twitter, query: string, sinceId?: number, countRegister: number = 20, result_type: string = 'recent') {
  const parameters = { q: query, count: countRegister, result_type: result_type };

  if (sinceId) {
    parameters["since_id"] = sinceId;
  }

  return await api.twitterSearch(client, parameters);
}

export function configureTwitterRouter(application: Application): void {
  const router = Router();
  router.post('/grant', twitterGrantAccessToken);
  router.post('/query', twitterStoreQuery);


  application.use('/twitter', router);
} 