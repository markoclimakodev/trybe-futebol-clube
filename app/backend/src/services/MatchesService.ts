import IMatchCreate from '../Interfaces/Matches/IMatchCreate';
import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getMatches(matchInProgress: string | undefined): Promise<IMatches[]> {
    if (matchInProgress !== undefined) {
      const isInProgress = matchInProgress === 'true';
      const filteredMatchesByProgress = await this.matchesModel.getMatchesByProgress(isInProgress);

      return filteredMatchesByProgress;
    }

    const allMatches = await this.matchesModel.getMatches();

    return allMatches;
  }

  public async finishMatch(id:number):Promise<void> {
    await this.matchesModel.finishMatch(id);
  }

  public async updateMatch(id: number, match: IMatches): Promise<void> {
    await this.matchesModel.updateMatch(id, match);
  }

  public async createMatch(newMatch:IMatchCreate):Promise<IMatches> {
    const createdMatch = await this.matchesModel.createMatch(newMatch);
    return createdMatch;
  }
}
