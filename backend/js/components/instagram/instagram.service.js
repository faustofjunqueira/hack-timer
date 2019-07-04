"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api = require("./instagram.api");
const request_1 = require("../../utils/request");
const configuration_service_1 = require("../configuration/configuration.service");
const getInstagramRedirectAuthUrl = (req) => `${request_1.getHost(req)}/instagram/auth`;
async function instagramGrantAccess(req, res) {
    const { clientId, clientSecret } = req.query;
    const configuration = await configuration_service_1.updateConfig('instagram.auth', { clientId, clientSecret });
    res.redirect(api.instagramAuthRedirect(configuration.instagram.auth.clientId, getInstagramRedirectAuthUrl(req)));
}
exports.instagramGrantAccess = instagramGrantAccess;
async function instagramAuth(req, res) {
    const instagramCode = req.query.code;
    const config = await configuration_service_1.updateConfig('instagram.auth.code', instagramCode);
    const instagramAccessTokenResponse = await api.instagramGetAccessToken(config.instagram.auth.clientId, config.instagram.auth.clientSecret, instagramCode, getInstagramRedirectAuthUrl(req));
    res.json(await configuration_service_1.updateConfig('instagram.auth.accessToken', instagramAccessTokenResponse['access_token']));
}
exports.instagramAuth = instagramAuth;
async function instagramGetData(req, res) {
    const config = await configuration_service_1.getConfig();
    try {
        if (config && config.instagram && config.instagram.auth.accessToken) {
            res.json(await api.instagramGetData(config.instagram.auth.accessToken));
        }
        else {
            res.send('configuration not found').status(404);
        }
    }
    catch (e) {
        res.send(e).status(404);
    }
}
exports.instagramGetData = instagramGetData;
function configurationInstragramRouter(application) {
    const router = express_1.Router();
    router.get('/grant', instagramGrantAccess);
    router.get('/auth', instagramAuth);
    router.get('/getdata', instagramGetData);
    application.use('/instagram', router);
}
exports.configurationInstragramRouter = configurationInstragramRouter;
