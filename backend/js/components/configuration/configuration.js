"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConfigurationSchema = new mongoose_1.Schema({
    instagram: {
        auth: {
            code: String,
            accessToken: String,
            clientId: { type: String, unique: true },
            clientSecret: { type: String }
        }
    },
    twitter: {
        auth: {
            consumerKey: { type: String, unique: true },
            consumerSecret: String,
            accessToken: String
        },
        query: String,
        sinceId: { type: Number, default: 0 }
    }
});
exports.Configuration = mongoose_1.model('Configuration', ConfigurationSchema);
