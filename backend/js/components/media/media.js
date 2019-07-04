"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MediaSchema = new mongoose_1.Schema({
    date: Date,
    profile: {
        name: String,
        media: String,
        id: String
    },
    id: String,
    text: String,
    media: String
});
exports.Media = mongoose_1.model('Media', MediaSchema);
