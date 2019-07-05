"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
exports.criarPromise = (acaoPromise) => new Promise(acaoPromise);
exports.promiseVoid = () => Promise.resolve();
exports.promiseMapear = (f, dadosEntrada) => Promise.all(dadosEntrada.map(f));
function promise(tornarPromise) {
    if (_.isFunction(tornarPromise)) {
        tornarPromise = tornarPromise();
    }
    return Promise.resolve(tornarPromise);
}
exports.promise = promise;
