import { IMedia, Media } from './media';
import { Request, Response, Application, Router } from 'express';


export async function storeMedia(obj: IMedia[]) {
  if (obj && obj.length) {
    return await Promise.all(obj.map(x => (new Media(x)).save()));
  }
  return null;
}

export async function getMedia(req: Request, res: Response) {
  res.json(await Media.find());
}

export function configureMediaRouter(application: Application): void {
  const router = Router();
  router.get('/', getMedia);

  application.use('/media', router);
} 