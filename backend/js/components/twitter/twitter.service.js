"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api = require("./twitter.api");
const configuration_service_1 = require("../configuration/configuration.service");
async function twitterGrantAccessToken(req, res) {
    try {
        const { consumerKey, consumerSecret } = req.body;
        const { access_token } = await api.twitterAuth(consumerKey, consumerSecret);
        const config = await configuration_service_1.updateConfig('twitter.auth', {
            consumerKey, consumerSecret,
            accessToken: access_token
        });
        res.json(config);
    }
    catch (e) {
        res.send(e).status(500);
    }
}
exports.twitterGrantAccessToken = twitterGrantAccessToken;
async function twitterStoreQuery(req, res) {
    try {
        const { query } = req.body;
        const config = await configuration_service_1.updateConfig('twitter.query', query);
        res.json(config);
    }
    catch (e) {
        res.send(e).status(500);
    }
}
exports.twitterStoreQuery = twitterStoreQuery;
async function twitterGetDataByQuery(client, query, sinceId, countRegister = 20, result_type = 'recent') {
    const parameters = { q: query, count: countRegister, result_type: result_type };
    if (sinceId) {
        parameters["since_id"] = sinceId;
    }
    return await api.twitterSearch(client, parameters);
}
exports.twitterGetDataByQuery = twitterGetDataByQuery;
function configureTwitterRouter(application) {
    const router = express_1.Router();
    router.post('/grant', twitterGrantAccessToken);
    router.post('/query', twitterStoreQuery);
    application.use('/twitter', router);
}
exports.configureTwitterRouter = configureTwitterRouter;
