import ILeaderBoard from '../Interfaces/LeaderBoards/ILeaderBoard';
import TeamStats from '../Interfaces/LeaderBoards/TeamStats';
import LeaderBoardModel from '../models/LeaderBoardModel';

export default class LeaderBoardService {
  constructor(
    private leaderBoardModel: ILeaderBoard = new LeaderBoardModel(),
  ) {}

  public async generateHomeLeaderBoard():Promise<TeamStats[]> {
    const generatedLeaderBoard = await this.leaderBoardModel.generateHomeLeaderBoard();
    return generatedLeaderBoard;
  }
}
