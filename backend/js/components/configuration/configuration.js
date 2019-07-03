"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ConfigurationSchema = new mongoose_1.Schema({
    instagram: {
        auth: {
            code: String,
            clientId: { type: String, unique: true },
            clientSecret: { type: String }
        }
    }
});
exports.Configuration = mongoose_1.model('Configuration', ConfigurationSchema);
