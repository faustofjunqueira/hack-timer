import { Router, Request, Response, Application } from 'express';
import * as api from './instagram.api';
import config = require('config');
import { getHost } from '../../utils/request';

export function instagramAuthRedirect(req: Request, res: Response) {
  res.redirect(api.instagramAuthRedirect(config.get('social.instagram.clientId'), `${getHost(req)}/instagram/code`));
}

export function instagramSaveCode(req: Request, res: Response) {
  const instagramCode = req.query.code;
  res.json(instagramCode);
}

export function configurationInstragramRouter(application: Application): void {
  const router = Router();
  router.get('/auth', instagramAuthRedirect);
  router.get('/code', instagramSaveCode);
  application.use('/instagram', router);
} 