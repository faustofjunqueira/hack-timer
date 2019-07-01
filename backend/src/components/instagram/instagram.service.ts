import { IConfiguration } from './../configuration/configuration';
import { Router, Request, Response, Application } from 'express';
import * as api from './instagram.api';
import { getHost } from '../../utils/request';
import { updateConfig } from '../configuration/configuration.service';

export async function instagramAuthRedirect(req: Request, res: Response) {
  const { clientId, clientSecret } = req.query;
  const configuration = await updateConfig('instagram.auth', { clientId, clientSecret });

  res.redirect(
    api.instagramAuthRedirect(
      configuration.instagram.auth.clientId,
      `${getHost(req)}/instagram/code`
    )
  );
}

export async function instagramSaveCode(req: Request, res: Response) {
  const instagramCode = req.query.code;
  const config = await updateConfig('instagram.auth.code', instagramCode);
  res.json(config);
}

export function configurationInstragramRouter(application: Application): void {
  const router = Router();
  router.get('/auth', instagramAuthRedirect);
  router.get('/code', instagramSaveCode);
  application.use('/instagram', router);
} 