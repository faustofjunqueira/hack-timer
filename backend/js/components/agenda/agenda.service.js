"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const agenda_1 = require("./agenda");
const log_1 = require("../../utils/log");
const fs = require("fs");
const parse = require("csv-parse/lib/sync");
function csvParse(csvPath) {
    const csv = parse(fs.readFileSync(csvPath).toString().trim(), { columns: (header) => header });
    const activities = new Array();
    csv.forEach((row) => {
        activities.push(new agenda_1.HackActivity({
            start: new Date(row.start),
            end: new Date(row.end),
            title: row.title,
            description: row.description
        }));
    });
    log_1.default.info(activities);
    return activities;
}
exports.csvParse = csvParse;
async function getActivities() {
    return await agenda_1.HackActivity.find({});
}
exports.getActivities = getActivities;
async function saveActivities(csvPath) {
    try {
        const activities = csvParse(csvPath);
        const docs = [];
        await activities.forEach(async (a) => {
            docs.push(await agenda_1.HackActivity.create(a));
        });
        return Promise.resolve(docs);
    }
    catch (_a) {
        return Promise.reject();
    }
}
exports.saveActivities = saveActivities;
async function resetActivities() {
    try {
        const activity = await agenda_1.HackActivity.remove({});
        return Promise.resolve(true);
    }
    catch (_a) {
        return Promise.resolve(false);
    }
}
exports.resetActivities = resetActivities;
