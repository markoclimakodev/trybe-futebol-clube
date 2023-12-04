import IMatchCreate from '../Interfaces/Matches/IMatchCreate';
import IMatches from '../Interfaces/Matches/IMatches';
import IMatchesModel from '../Interfaces/Matches/IMatchesModel';
import SequelizeMatches from '../database/models/SequelizeMatches';
import SequelizeTeam from '../database/models/SequelizeTeam';
import NotFoundError from '../helpers/ApiError/NotFoundError';
import TeamModel from './TeamModel';

export default class MatchesModel implements IMatchesModel {
  private model = SequelizeMatches;
  private teamsModel = new TeamModel();

  teamModel = [
    {
      model: SequelizeTeam,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: SequelizeTeam,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ];

  async getMatches(): Promise<IMatches[]> {
    const matches = await this.model.findAll({ include: this.teamModel });

    return matches;
  }

  async getMatchesByProgress(progress: boolean): Promise<IMatches[]> {
    const inProgressMatches = await this.model.findAll({
      where: { inProgress: progress },
      include: this.teamModel,
    });

    return inProgressMatches;
  }

  async finishMatch(id: number): Promise<void> {
    await this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, match: IMatches): Promise<void> {
    await this.model.update(match, { where: { id } });
  }

  async verifyTeamsExist(homeTeamId: number, awayTeamId: number): Promise<boolean> {
    const homeTeamData = await this.teamsModel.findById(homeTeamId);
    const awayTeamData = await this.teamsModel.findById(awayTeamId);

    if (!homeTeamData || !awayTeamData) {
      throw new NotFoundError('There is no team with such id!');
    }

    return true;
  }

  async createMatch(newMatch: IMatchCreate): Promise<IMatches> {
    const { homeTeamId, awayTeamId } = newMatch;
    await this.verifyTeamsExist(homeTeamId, awayTeamId);
    const matchData = await this.model.create({ ...newMatch, inProgress: true });
    return matchData;
  }
}
