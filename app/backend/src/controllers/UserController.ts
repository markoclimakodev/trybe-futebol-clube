import { Request, Response } from 'express';
import UnauthorizedError from '../helpers/ApiError/UnauthorizedError';
import UserService from '../services/UserService';

export default class UserController {
  constructor(private userSerive = new UserService()) { }

  public async login(req: Request, res: Response) {
    const login = req.body;
    const token = await this.userSerive.login(login);

    if (!token) {
      throw new UnauthorizedError('Invalid email or password');
    }

    res.status(200).json({ token });
  }

  public async findRole(req: Request, res: Response) {
    const login = req.body;
    const role = await this.userSerive.findRole(login);

    res.status(200).json(role);
  }
}
