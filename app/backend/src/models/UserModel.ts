import * as bcrypt from 'bcryptjs';
import ILogin from '../Interfaces/User/ILogin';
import IUserModel from '../Interfaces/User/IUserModel';
import SequelizeUser from '../database/models/SequelizeUser';
import JWTTokenGenerator from '../utils/JWTTokenGenerator';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async login(login: ILogin): Promise<string | null> {
    const user = await this.model.findOne({ where: { email: login.email } });

    if (user && bcrypt.compareSync(login.password, user.password)) {
      return JWTTokenGenerator.generateToken({
        id: user.id,
        role: user.role,
        email: user.email,
      });
    }

    return null;
  }
}
