const config = require('config');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const helmet = require('helmet');
//const mongoose = require('mongoose');


const { upServer } = require('./server');

module.exports.startApplication = async function () {
  try {
    await database();
    const application = express();
    middlewares(application);
    routes(application);
    upServer(application, config.get('http.port'));
    return application;
  } catch (e) {
    console.log(e);
    console.log("Application shutdown");
    process.exit(-1);
  }
}

function middlewares(application, ) {
  application.set("maxFieldsSize", '200 * 1024 * 1024 * 1024');
  application.use(morgan('<:remote-addr - :remote-user ":referrer" ":user-agent"> ":method :url HTTP/:http-version" :status'));
  application.use(bodyParser.json({ limit: '5mb' }));
  application.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
  application.use(bodyParser.raw({ limit: '5mb' }));
  application.use(helmet());
  console.log("Middleware configured");
}

function routes(application) {
  application.use("/company", require('./services/company.service'));
  console.log("Routes configured");
}

async function database() {
  // await mongoose.connect(config.get("db.host"), config.get("db.options"));
  // console.log("Database Connected");
}