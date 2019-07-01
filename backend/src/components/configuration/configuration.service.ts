import { Application, Router } from 'express';
import { Configuration, IConfiguration } from './configuration';
import { merge, set } from 'lodash';

export async function updateConfig(key: string, value: any): Promise<IConfiguration> {
  let configuration = await getConfig();
  if (configuration) {
    set(configuration, key, value);
  } else {
    configuration = new Configuration(set({}, key, value));
  }
  return await configuration.save();
}

export async function saveConfig(configRegister: object): Promise<IConfiguration> {
  let configuration = await getConfig();
  if (configuration) {
    merge(configuration, configRegister);
  } else {
    configuration = new Configuration(configRegister);
  }
  return await configuration.save();
}

export async function getConfig(): Promise<IConfiguration> {
  return await Configuration.findOne();
}

export async function resetConfig(): Promise<IConfiguration> {
  const configuration = await Configuration.findOne();
  if (configuration) {
    return configuration.remove();
  }
  return null;
}

export function configureConfigurationRoute(application: Application) {
  const route = Router();
  route.get('/', async (req, res) => res.json(await getConfig()));
  route.put('/', async (req, res) => res.json(await saveConfig(req.body)));
  route.delete('/', async (req, res) => res.json(await resetConfig()));
  application.use('/config', route);
}