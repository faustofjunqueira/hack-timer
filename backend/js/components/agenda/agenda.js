"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const HackActivitySchema = new mongoose_1.Schema({
    start: { type: Date, required: true, unique: false },
    end: { type: Date, required: true, unique: false },
    title: { type: String, required: true, unique: false },
    description: { type: String, required: false, unique: false }
});
exports.HackActivity = mongoose_1.model('HackActivity', HackActivitySchema);
