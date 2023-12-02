import * as bcrypt from 'bcryptjs';
import ILogin from '../Interfaces/User/ILogin';
import IUserModel from '../Interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';
import tokenGenerate from '../utils/tokenGenerate';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(login: ILogin): Promise<string | null> {
    const { email, password } = login;
    const user = await this.model.findOne({ where: { email } });

    if (user && bcrypt.compareSync(password, user.password)) {
      return tokenGenerate({
        username: user.username,
        email: user.email,
      });
    }

    return null;
  }
}
