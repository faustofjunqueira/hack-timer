import * as _ from 'lodash';
/**
 * Wrapper para criação de promisse
 *
 * @template T
 * @param {((resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void)} acaoPromise
 */
export const criarPromise = <T>(acaoPromise: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) =>
  new Promise<T>(acaoPromise);
/**
 * Cria uma promise vazia
 *
 */
export const promiseVoid = () =>
  Promise.resolve();
/**
 * Aplica promise all e uma função de mapeamento sobre os dados
 *
 * @template TipoEntrada
 * @template TipoSaida
 * @param {(entrada: TipoEntrada) => Promise<TipoSaida>} f
 * @param {TipoEntrada[]} dadosEntrada
 * @returns {Promise<TipoSaida[]>}
 */
export const promiseMapear = <TipoEntrada, TipoSaida>(f: (entrada: TipoEntrada) => Promise<TipoSaida>, dadosEntrada: TipoEntrada[]): Promise<TipoSaida[]> =>
  Promise.all(dadosEntrada.map(f));

/**
 * Transforma em promise
 *
 * @export
 * @template T
 * @param {T} tornarPromise elemento para se tornar promise
 */
export function promise<T>(tornarPromise: T);
/**
 * Transforma o resultado em promise
 *
 * @export
 * @template T
 * @param {() => T} tornarPromise função que será executada para se tornar promise
 */
export function promise<T>(tornarPromise: () => T);
export function promise<T>(tornarPromise: any) {
  if(_.isFunction(tornarPromise)){
    tornarPromise = tornarPromise();
  }
  return Promise.resolve(tornarPromise);
}