import * as bcrypt from 'bcryptjs';
import ILogin from '../Interfaces/User/ILogin';
import { IRole } from '../Interfaces/User/IUser';
import IUserModel from '../Interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';
import tokenGenerate from '../utils/tokenGenerate';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(login: ILogin): Promise<string | null> {
    const user = await this.model.findOne({ where: { email: login.email } });

    if (user && bcrypt.compareSync(login.password, user.password)) {
      return tokenGenerate({ id: user.id });
    }

    return null;
  }

  async findRole(login: ILogin): Promise<IRole | null> {
    const user = await this.model.findOne({ where: { email: login.email } });
    if (user) {
      return { role: user.role };
    }
    return null;
  }
}
