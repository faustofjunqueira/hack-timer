"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const agenda_service_1 = require("./agenda.service");
function configureAgendaRouter(app) {
    const router = express_1.Router();
    router.get('/', async (req, res) => res.json(await agenda_service_1.getActivities()));
    router.delete('/', async (req, res) => res.json(await agenda_service_1.resetActivities()));
    router.put('/', async (req, res) => {
        res.json(await agenda_service_1.saveActivities(req.body));
    });
    return app.use('/agenda', router);
}
exports.configureAgendaRouter = configureAgendaRouter;
