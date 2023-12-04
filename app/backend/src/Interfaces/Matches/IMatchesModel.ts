import IMatches from './IMatches';

export default interface IMatchesModel {
  getMatches():Promise<IMatches[]>
  getMatchesByProgress(progress: boolean):Promise<IMatches[]>
  finishMatch(id:number):Promise<[number]>
}
/** https://cursos.alura.com.br/forum/topico-error-ts2322-type-affectedcount-number-is-not-assignable-to-type-number-produto-source-has-1-element-s-but-target-requires-2-223505  */
