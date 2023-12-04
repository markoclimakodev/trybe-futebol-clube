import { Request, Response } from 'express';
import IMatches from '../Interfaces/Matches/IMatches';
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
    await this.matchesService.finishMatch(Number(id));
    res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const match: IMatches = req.body;
    await this.matchesService.updateMatch(Number(id), match);
    res.status(200).json({ message: 'Match updated' });
  }

  public async createMatch(req: Request, res: Response) {
    const newMatch = req.body;
    const createdMatch = await this.matchesService.createMatch(newMatch);
    res.status(201).json(createdMatch);
  }
}
