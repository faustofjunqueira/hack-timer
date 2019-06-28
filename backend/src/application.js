const mongoose = require('mongoose');
const config = require('config');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('./utils/log');
const { upServer } = require('./server');

// social media wall
// - de n - n uma requisição para o Instagram, Twitter e Fb buscando pela hashtag
// - Armazena no banco o resultado
// - oferece por websocket

// Timer
// - Configurar Timer com horario do server quando começou e quanto tempo desejar
// - Quando criar um Timer, criar uma instancia de timer
// - Start / Pause Timer
// - Websocket do timer

// @todo
// - Agenda
// -
// - Palestra
// -
// - Premiação
// -
// - Ester egg
// -
// - Aviso momentâneo(com ou sem cronometro)
// -
// - Login com AD


module.exports.startApplication = async function () {
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
  //application.use("/timer", require('./components/timer').router);
  logger.info("application.route.done");
}

async function database() {
  await mongoose.connect(config.get("db.mongo.host"), config.get("db.mongo.options"));
  logger.info("application.db.done");
}