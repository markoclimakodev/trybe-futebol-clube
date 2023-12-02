import { Request, Response } from 'express';
import mapStatusHTTP from '../helpers/MapStatusHTTP';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(private teamService = new TeamService()) {}

  public async findAll(_req:Request, res:Response) {
    const serviceResponse = await this.teamService.findAll();
    res.status(200).json(serviceResponse.data);
  }

  public async findById(req:Request, res:Response) {
    const { id } = req.params;
    const serviceResponse = await this.teamService.findById(Number(id));

    if (serviceResponse.status !== 'success') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }
}
