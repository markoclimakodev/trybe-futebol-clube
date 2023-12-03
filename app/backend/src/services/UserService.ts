import ILogin from '../Interfaces/User/ILogin';
import IUserModel from '../Interfaces/User/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login(login:ILogin):Promise<string | null> {
    const token = await this.userModel.login(login);
    return token;
  }
}
