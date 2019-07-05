"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = require("./promise");
function createCicleFunction(cicleFunction) {
    let timerExecucao = null;
    const acao = (args) => promise_1.promise(() => cicleFunction(args));
    let emExecucao = false;
    let pararFuncaoCiclica = null;
    return {
        start(tempo, args) {
            const fnAcao = async () => {
                if (pararFuncaoCiclica) {
                    pararFuncaoCiclica();
                    pararFuncaoCiclica = null;
                    emExecucao = false;
                    return;
                }
                emExecucao = true;
                await acao(args);
                timerExecucao = setTimeout(fnAcao, tempo);
                emExecucao = false;
            };
            setImmediate(fnAcao);
        },
        stop() {
            return new Promise((resolve, reject) => {
                if (timerExecucao) {
                    clearTimeout(timerExecucao);
                }
                if (emExecucao) {
                    pararFuncaoCiclica = resolve;
                }
                else {
                    resolve();
                }
            });
        },
        async restart(tempo, args) {
            await this.stop();
            this.start(tempo, args);
        }
    };
}
exports.createCicleFunction = createCicleFunction;
