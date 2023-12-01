import { StatusCodes } from 'http-status-codes';
import ITeam from '../Interfaces/ITeam';
import ITeamService from '../Interfaces/services/ITeamService';
import Team from '../database/models/Teams';
import HttpError from '../helpers/HttpError';

export default class TeamsService implements ITeamService {
  constructor(private teamsModel: typeof Team) {}

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.teamsModel.findAll();

    return teams;
  }

  public async findById(id: number): Promise<ITeam> {
    const team = await this.teamsModel.findByPk(id);
    if (!team) throw new HttpError(StatusCodes.NOT_FOUND, 'Team not found');
    return team;
  }
}
