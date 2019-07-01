import { Application, Router } from 'express';
import { Configuration } from './configuration';
import { Document } from 'mongoose';

export async function saveConfig(configRegister: object): Promise<Document> {
  const config = new Configuration(configRegister);
  return await config.save();
}

export async function getConfig(): Promise<Document> {
  return await Configuration.findOne();
}

export function configureConfigurationRoute(application: Application) {
  const route = Router();
  route.get('/', async (req, res) => res.json(await getConfig()));
  route.put('/', async (req, res) => res.json(await saveConfig(req.body)));
  application.use('/config', route);
}