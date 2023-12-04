import IMatchCreate from './IMatchCreate';
import IMatches from './IMatches';

export default interface IMatchesModel {
  getMatches():Promise<IMatches[]>
  getMatchesByProgress(progress: boolean):Promise<IMatches[]>
  finishMatch(id:number):Promise<void>
  updateMatch(id: number, match: IMatches): Promise<void>
  verifyTeamsExist(homeTeamId: number, awayTeamId: number): Promise<boolean>
  createMatch(newMatch:IMatchCreate):Promise<IMatches>
}
