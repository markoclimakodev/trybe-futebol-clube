import IMatches from './IMatches';

export default interface IMatchesModel {
  getAllMatches():Promise<IMatches[]>
}
