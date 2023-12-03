import ITeam from '../Interfaces/Team/ITeam';
import ITeamModel from '../Interfaces/Team/ITeamModel';
import TeamModel from '../models/TeamModel';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async findAll(): Promise<ITeam[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async findById(id: number): Promise<ITeam | null> {
    const team = await this.teamModel.findById(id);
    if (!team) {
      return null;
    }
    return team;
  }
}
