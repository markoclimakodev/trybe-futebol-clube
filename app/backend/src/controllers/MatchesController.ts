import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getMatches(req:Request, res:Response) {
    const { inProgress } = req.query;
    const progress = typeof inProgress === 'string' ? inProgress : undefined;
    const matches = await this.matchesService.getMatches(progress);
    res.status(200).json(matches);
  }

  public async finishMatch(req:Request, res:Response) {
    const { id } = req.params;
    console.log(id);
    await this.matchesService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }
}
