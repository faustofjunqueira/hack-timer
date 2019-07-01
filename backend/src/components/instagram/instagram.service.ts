import { Router, Request, Response, Application } from 'express';
import * as api from './instagram.api';
import config = require('config');
import { getHost } from '../../utils/request';
import logger from '../../utils/log';

export function instagramAuthRedirect(req: Request, res: Response) {
  logger.info(getHost(req));
  res.redirect(api.instagramAuthRedirect(config.get('social.instagram.clientId'), 'junda'));
}

export function configurationInstragramRouter(application: Application): void {
  const router = Router();
  router.get('/auth', instagramAuthRedirect);
  application.use('/instagram', router);
} 