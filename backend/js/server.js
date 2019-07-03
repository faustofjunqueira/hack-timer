"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const log_1 = require("./utils/log");
function upServer(application, port) {
    const server = http_1.createServer(application);
    log_1.default.info('server.done', { port });
    server.listen(Number(port));
    return server;
}
exports.upServer = upServer;
