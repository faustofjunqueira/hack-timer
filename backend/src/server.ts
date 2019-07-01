import { createServer } from 'http';
import logger from './utils/log';


export function upServer(application, port) {
  const server = createServer(application);
  logger.info('server.done', { port });
  server.listen(Number(port));
  return server;
}