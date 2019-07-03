import { Router, Request, Response, Application } from 'express';
import * as api from './instagram.api';
import { getHost } from '../../utils/request';
import { updateConfig, getConfig } from '../configuration/configuration.service';

const getInstagramRedirectAuthUrl =
  (req: Request): string => `${getHost(req)}/instagram/auth`;

export async function instagramGrantAccess(req: Request, res: Response) {
  const { clientId, clientSecret } = req.query;
  const configuration = await updateConfig('instagram.auth', { clientId, clientSecret });

  res.redirect(
    api.instagramAuthRedirect(
      configuration.instagram.auth.clientId,
      getInstagramRedirectAuthUrl(req)
    )
  );
}

export async function instagramAuth(req: Request, res: Response) {
  const instagramCode = req.query.code;
  const config = await updateConfig('instagram.auth.code', instagramCode);
  const instagramAccessTokenResponse = await api.instagramGetAccessToken(
    config.instagram.auth.clientId,
    config.instagram.auth.clientSecret,
    instagramCode,
    getInstagramRedirectAuthUrl(req)
  );

  res.json(await updateConfig('instagram.auth.accessToken', instagramAccessTokenResponse['access_token']));
}

export async function instagramGetData(req: Request, res: Response) {
  const config = await getConfig();
  try {
    if (config && config.instagram && config.instagram.auth.accessToken) {
      res.json(await api.instagramGetData(config.instagram.auth.accessToken));
    } else {
      res.send('configuration not found').status(404);
    }
  } catch (e) {
    res.send(e).status(404);
  }
}

export function configurationInstragramRouter(application: Application): void {
  const router = Router();
  router.get('/grant', instagramGrantAccess);
  router.get('/auth', instagramAuth);
  router.get('/getdata', instagramGetData);

  application.use('/instagram', router);
} 