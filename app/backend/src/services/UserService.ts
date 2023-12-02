import { ServiceResponse } from '../Interfaces/ServiceResponse';
import ILogin from '../Interfaces/User/ILogin';
import { IRole } from '../Interfaces/User/IUser';
import IUserModel from '../Interfaces/User/IUserModel';
import UserModel from '../models/UserModel';

export default class UserService {
  constructor(private userModel: IUserModel = new UserModel()) {}

  public async login(login:ILogin):Promise<ServiceResponse<string>> {
    const token = await this.userModel.login(login);
    if (!token) {
      return { status: 'unauthorized', data: { message: 'Invalid email or password' } };
    }

    return { status: 'success', data: token };
  }

  public async findRole(login:ILogin):Promise<ServiceResponse<IRole>> {
    const role = await this.userModel.findRole(login);
    if (!role) {
      return { status: 'unauthorized', data: { message: 'Token not found' } };
    }
    return { status: 'success', data: role };
  }
}
