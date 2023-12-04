import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(): Promise<IMatches[]> {
    const matches = await this.matchesModel.getAllMatches();
    return matches;
  }
}
