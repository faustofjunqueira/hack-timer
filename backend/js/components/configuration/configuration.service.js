"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configuration_1 = require("./configuration");
const lodash_1 = require("lodash");
async function updateConfig(key, value) {
    let configuration = await getConfig();
    if (configuration) {
        lodash_1.set(configuration, key, value);
    }
    else {
        configuration = new configuration_1.Configuration(lodash_1.set({}, key, value));
    }
    return await configuration.save();
}
exports.updateConfig = updateConfig;
async function saveConfig(configRegister) {
    let configuration = await getConfig();
    if (configuration) {
        lodash_1.merge(configuration, configRegister);
    }
    else {
        configuration = new configuration_1.Configuration(configRegister);
    }
    return await configuration.save();
}
exports.saveConfig = saveConfig;
async function getConfig() {
    return await configuration_1.Configuration.findOne();
}
exports.getConfig = getConfig;
async function resetConfig() {
    const configuration = await configuration_1.Configuration.findOne();
    if (configuration) {
        return configuration.remove();
    }
    return null;
}
exports.resetConfig = resetConfig;
function configureConfigurationRoute(application) {
    const route = express_1.Router();
    route.get('/', async (req, res) => res.json(await getConfig()));
    route.put('/', async (req, res) => res.json(await saveConfig(req.body)));
    route.delete('/', async (req, res) => res.json(await resetConfig()));
    application.use('/config', route);
}
exports.configureConfigurationRoute = configureConfigurationRoute;
