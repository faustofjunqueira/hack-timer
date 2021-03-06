"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const config = require("config");
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const log_1 = require("./utils/log");
const server_1 = require("./server");
const configuration_service_1 = require("./components/configuration/configuration.service");
const agenda_api_1 = require("./components/agenda/agenda.api");
async function startApplication() {
    try {
        await database();
        const application = express();
        middlewares(application);
        routes(application);
        server_1.upServer(application, config.get('http.port'));
        return application;
    }
    catch (error) {
        log_1.default.error('application.shutdown', { error });
        process.exit(-1);
    }
}
exports.startApplication = startApplication;
function middlewares(application) {
    application.set("maxFieldsSize", '200 * 1024 * 1024 * 1024');
    application.use(cors());
    application.use(morgan('<:remote-addr - :remote-user ":referrer" ":user-agent"> ":method :url HTTP/:http-version" :status'));
    application.use(bodyParser.json({ limit: '5mb' }));
    application.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
    application.use(bodyParser.raw({ limit: '5mb' }));
    application.use(bodyParser.text({ limit: '5mb' }));
    application.use(helmet());
    log_1.default.info('application.middleware.done');
}
function routes(application) {
    configuration_service_1.configureConfigurationRoute(application);
    agenda_api_1.configureAgendaRouter(application);
    application.get('/echo', (req, res) => {
        res.json({
            body: req.body,
            query: req.query
        }).status(200);
    });
    log_1.default.info("application.route.done");
}
async function database() {
    let users = '';
    if (config.has("db.mongo.user") && config.has("db.mongo.pass")) {
        users = `${encodeURIComponent(config.get("db.mongo.user"))}:${encodeURIComponent(config.get("db.mongo.pass"))}@`;
    }
    const url = `mongodb://${users}${config.get("db.mongo.host")}`;
    log_1.default.info("application.db.url", { url });
    await mongoose.connect(url, config.get("db.mongo.options"));
    log_1.default.info("application.db.done");
}
