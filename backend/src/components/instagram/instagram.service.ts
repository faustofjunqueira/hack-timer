import { Router, Request, Response, Application } from 'express';
import * as api from './instagram.api';
import { getHost } from '../../utils/request';
import { updateConfig } from '../configuration/configuration.service';

export async function instagramGrantAccess(req: Request, res: Response) {
  const { clientId, clientSecret } = req.query;
  const configuration = await updateConfig('instagram.auth', { clientId, clientSecret });

  res.redirect(
    api.instagramAuthRedirect(
      configuration.instagram.auth.clientId,
      `${getHost(req)}/instagram/auth`
    )
  );
}

export async function instagramAuth(req: Request, res: Response) {
  const instagramCode = req.query.code;
  const config = await updateConfig('instagram.auth.code', instagramCode);

  const c = await api.instagramGetAccessToken(
    config.instagram.auth.clientId,
    config.instagram.auth.clientSecret,
    instagramCode,
    `${getHost(req)}/instagram/auth`
  );

  res.json(await updateConfig('instagram.auth.accessToken', instagramCode));
}

export function configurationInstragramRouter(application: Application): void {
  const router = Router();
  router.get('/grant', instagramGrantAccess);
  router.get('/auth', instagramAuth);

  application.use('/instagram', router);
} 