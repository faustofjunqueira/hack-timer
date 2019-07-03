"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api = require("./instagram.api");
const request_1 = require("../../utils/request");
const configuration_service_1 = require("../configuration/configuration.service");
async function instagramAuthRedirect(req, res) {
    const { clientId, clientSecret } = req.query;
    const configuration = await configuration_service_1.updateConfig('instagram.auth', { clientId, clientSecret });
    res.redirect(api.instagramAuthRedirect(configuration.instagram.auth.clientId, `${request_1.getHost(req)}/instagram/code`));
}
exports.instagramAuthRedirect = instagramAuthRedirect;
async function instagramSaveCode(req, res) {
    const instagramCode = req.query.code;
    const config = await configuration_service_1.updateConfig('instagram.auth.code', instagramCode);
    res.json(config);
}
exports.instagramSaveCode = instagramSaveCode;
function configurationInstragramRouter(application) {
    const router = express_1.Router();
    router.get('/auth', instagramAuthRedirect);
    router.get('/code', instagramSaveCode);
    application.use('/instagram', router);
}
exports.configurationInstragramRouter = configurationInstragramRouter;
