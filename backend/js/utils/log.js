"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config = require("config");
const winston = require("winston");
const { format } = winston;
const { combine, printf } = format;
const messagesKey = require('../assets/message.json');
const console = new winston.transports.Console();
const messageKeyFormat = printf((_a) => {
    var { level, message, label, timestamp } = _a, meta = __rest(_a, ["level", "message", "label", "timestamp"]);
    const handledLabel = label === config.get('log.default.format.label') ? '' : " [" + label + "]";
    let handledError = '', handledMeta = '';
    if (Object.keys(meta).length) {
        let { error } = meta, otherMetas = __rest(meta, ["error"]);
        if (Object.keys(otherMetas).length) {
            handledMeta = ' ' + JSON.stringify(otherMetas);
        }
        if (error && error instanceof Error) {
            handledError = `\n${error.stack}`;
        }
    }
    return `${timestamp} ${level}${handledLabel}: ${messagesKey[message]}${handledMeta}${handledError}`;
});
winston.configure({
    format: combine(format.label({ label: config.get('log.default.format.label') }), format.timestamp(), format.colorize(), messageKeyFormat),
    transports: [console]
});
exports.default = winston;
