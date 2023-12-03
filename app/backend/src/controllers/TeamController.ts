import { Request, Response } from 'express';
import NotFoundError from '../helpers/ApiError/NotFoundError';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async findAll(_req:Request, res:Response) {
    const teams = await this.teamService.findAll();
    res.status(200).json(teams);
  }

  public async findById(req:Request, res:Response) {
    const { id } = req.params;
    const team = await this.teamService.findById(Number(id));

    if (!team) {
      throw new NotFoundError('Team not found');
    }

    res.status(200).json(team);
  }
}
