"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configuration_service_1 = require("../configuration/configuration.service");
const cicle_function_1 = require("../../utils/cicle-function");
const config = require("config");
async function startInstagramProcess() {
    const configuration = await configuration_service_1.getConfig();
    if (configuration) {
        cicle_function_1.createCicleFunction(instagramGetData)
            .start(config.get('instagram.time-fetch-data'), configuration);
    }
}
exports.startInstagramProcess = startInstagramProcess;
async function instagramGetData(configuration) {
}
exports.instagramGetData = instagramGetData;
