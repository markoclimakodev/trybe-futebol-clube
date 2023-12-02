import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ITeam from '../Interfaces/Team/ITeam';
import ITeamModel from '../Interfaces/Team/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    const teams = await this.teamModel.findAll();
    return { status: 'success', data: teams };
  }

  public async findById(id: number): Promise<ServiceResponse<ITeam>> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return { status: 'badRequest', data: { message: 'Team not found' } };
    }
    return { status: 'success', data: team };
  }
}
