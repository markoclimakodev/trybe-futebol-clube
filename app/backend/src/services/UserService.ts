import ILogin from '../Interfaces/User/ILogin';
import { IRole } from '../Interfaces/User/IUser';
import IUserModel from '../Interfaces/User/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login(login:ILogin):Promise<string | null> {
    const token = await this.userModel.login(login);
    if (!token) return null;

    return token;
  }

  public async findRole(login:ILogin):Promise<IRole | null> {
    const role = await this.userModel.findRole(login);
    if (!role) {
      return null;
    }
    return role;
  }
}
