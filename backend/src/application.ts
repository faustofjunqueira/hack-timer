import mongoose = require('mongoose');
import config = require('config');
import express = require('express');
import morgan = require('morgan');
import bodyParser = require('body-parser');
import helmet = require('helmet');
import cors = require('cors');
import logger from './utils/log';
import { upServer } from './server';
import { configureConfigurationRoute } from './components/configuration/configuration.service';
import { configureAgendaRouter } from './components/agenda/agenda.api';

export async function startApplication() {
  try {
    await database();
    const application = express();
    middlewares(application);
    routes(application);
    upServer(application, config.get('http.port'));
    return application;
  } catch (error) {
    logger.error('application.shutdown', { error });
    process.exit(-1);
  }
}

function middlewares(application) {
  application.set("maxFieldsSize", '200 * 1024 * 1024 * 1024');
  application.use(cors());
  application.use(
    morgan('<:remote-addr - :remote-user ":referrer" ":user-agent"> ":method :url HTTP/:http-version" :status'));
  application.use(bodyParser.json({ limit: '5mb' }));
  application.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  application.use(bodyParser.raw({ limit: '5mb' }));
  application.use(bodyParser.text({ limit: '5mb' }));
  application.use(helmet());
  logger.info('application.middleware.done');
}

function routes(application) {
  configureConfigurationRoute(application);
  configureAgendaRouter(application);

  application.get('/echo', (req, res) => {

    res.json({
      body: req.body,
      query: req.query
    }).status(200);
  });
  logger.info("application.route.done");
}

async function database() {
  let users = '';
  if (config.has("db.mongo.user") && config.has("db.mongo.pass")) {
    users = `${encodeURIComponent(config.get("db.mongo.user"))}:${encodeURIComponent(config.get("db.mongo.pass"))}@`;
  }
  const url = `mongodb://${users}${config.get("db.mongo.host")}`;
  logger.info("application.db.url", { url });
  await mongoose.connect(url, config.get("db.mongo.options"));
  logger.info("application.db.done");
}