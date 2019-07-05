"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHost = (req) => `${req.protocol}://${req.get('host')}`;
