import mongoose = require('mongoose');
import config = require('config');
import express = require('express');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import helmet = require('helmet');
import logger from './utils/log';
import { upServer } from './server';
import { configurationInstragramRouter as configureInstragramRouter } from './components/instagram/instagram.service';
import { configureConfigurationRoute } from './components/configuration/configuration.service';

export async function startApplication() {
  try {
    await database();
    const application = express();
    middlewares(application);
    routes(application);
    upServer(application, config.get('http.port'));
    return application;
  } catch (error) {
    logger.error('application.shutdown', { error })
    process.exit(-1);
  }
}

function middlewares(application) {
  application.set("maxFieldsSize", '200 * 1024 * 1024 * 1024');
  application.use(morgan('<:remote-addr - :remote-user ":referrer" ":user-agent"> ":method :url HTTP/:http-version" :status'));
  application.use(bodyParser.json({ limit: '5mb' }));
  application.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  application.use(bodyParser.raw({ limit: '5mb' }));
  application.use(helmet());
  logger.info('application.middleware.done');
}

function routes(application) {
  configureInstragramRouter(application);
  configureConfigurationRoute(application);
  logger.info("application.route.done");
}

async function database() {
  await mongoose.connect(config.get("db.mongo.host"), config.get("db.mongo.options"));
  logger.info("application.db.done");
}