"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const media_1 = require("./media");
const express_1 = require("express");
async function storeMedia(obj) {
    if (obj && obj.length) {
        return await Promise.all(obj.map(x => (new media_1.Media(x)).save()));
    }
    return null;
}
exports.storeMedia = storeMedia;
async function getMedia(req, res) {
    res.json(await media_1.Media.find());
}
exports.getMedia = getMedia;
function configureMediaRouter(application) {
    const router = express_1.Router();
    router.get('/', getMedia);
    application.use('/media', router);
}
exports.configureMediaRouter = configureMediaRouter;
