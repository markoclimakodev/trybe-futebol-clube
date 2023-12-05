import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  constructor(private leaderBoardService = new LeaderBoardService()) {}

  public async generateHomeLeaderBoard(_req:Request, res:Response) {
    const generatedLeaderBoard = await this.leaderBoardService.generateHomeLeaderBoard();
    res.status(200).json(generatedLeaderBoard);
  }
}
