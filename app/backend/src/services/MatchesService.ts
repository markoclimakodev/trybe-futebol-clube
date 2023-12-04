import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import MatchesModel from '../models/MatchesModel';

export default class MatchesService {
  constructor(
    private matchesModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getMatches(progress: string | undefined): Promise<IMatches[]> {
    if (progress !== undefined) {
      const inProgress = progress === 'true';
      const filteredMatches = await this.matchesModel.getMatchesByProgress(inProgress);

      return filteredMatches;
    }

    const allMatches = await this.matchesModel.getMatches();

    return allMatches;
  }
}
