import { promise } from "./promise";

/**
 * Função que fica em loop
 *
 * @export
 * @interface FuncaoCiclica
 */
export interface CicleFunction {
  /**
   * Inicia a execução da função em loop
   *
   * @param {number} tempo tempo entre execucao
   * @param {any} args argumento da funcao ciclica
   * @memberof FuncaoCiclica
   */
  start(tempo: number, args: any): void;
  /**
   * Para a execução da função
   *
   * @returns {Promise<void>}
   * @memberof FuncaoCiclica
   */
  stop(): Promise<void>;
  /**
   * Para e inicia a função
   *
   * @param {number} tempo tempo entre execucao
   * @param {any} args argumento da funcao ciclica
   * @returns {Promise<void>}
   * @memberof FuncaoCiclica
   */
  restart(tempo: number, args: any): Promise<void>;
}
/**
 * Cria uma função que executa em loop, baseado em setTimeout recursivo
 *
 * @export
 * @param {(() => Promise<void> | void)} cicleFunction função que ficará em execucao
 * @param {() => Promise<void>} [funcaoDestruir=(() => Promise.resolve())] função que será executada apos a destruição
 * @returns {CicleFunction} 
 */
export function createCicleFunction<T>(cicleFunction: (args: any) => Promise<void> | void): CicleFunction {
  let timerExecucao: NodeJS.Timer = null;
  const acao = (args: any) => promise(() => cicleFunction(args));
  let emExecucao: boolean = false;
  let pararFuncaoCiclica: any = null;
  return {
    start(tempo: number, args: any): void {
      const fnAcao = async () => {

        if (pararFuncaoCiclica) { // Caso tenha sido invocado a função parar. Então não será executado o iniciar
          pararFuncaoCiclica();
          pararFuncaoCiclica = null;
          emExecucao = false;
          return;
        }
        emExecucao = true;
        await acao(args);
        timerExecucao = setTimeout(fnAcao, tempo);
        emExecucao = false;
      }
      setImmediate(fnAcao);
    },
    stop() {
      return new Promise((resolve, reject) => {
        if (timerExecucao) {
          clearTimeout(timerExecucao);
        }
        if (emExecucao) {
          pararFuncaoCiclica = resolve;
        } else {
          resolve();
        }
      });
    },
    async restart(tempo: number, args: any) {
      await this.stop();
      this.start(tempo, args);
    }
  }
}

