import { Request, Response } from 'express';
import mapStatusHTTP from '../helpers/MapStatusHTTP';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userSerive = new UserService()) {}

  public async login(req:Request, res:Response) {
    const login = req.body;
    const serviceRespose = await this.userSerive.login(login);

    if (serviceRespose.status !== 'success') {
      return res.status(mapStatusHTTP(serviceRespose.status)).json(serviceRespose.data);
    }

    res.status(200).json({ token: serviceRespose.data });
  }
}
