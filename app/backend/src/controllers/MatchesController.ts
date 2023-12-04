import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(private matchesService = new MatchesService()) {}

  public async getAllMatches(_req:Request, res:Response) {
    const matches = await this.matchesService.getAllMatches();
    res.status(200).json(matches);
  }
}
