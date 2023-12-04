import IMatches from './IMatches';

export default interface IMatchesModel {
  getMatches():Promise<IMatches[]>
  getMatchesByProgress(progress: boolean):Promise<IMatches[]>
}
