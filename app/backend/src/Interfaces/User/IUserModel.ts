import ILogin from './ILogin';
import { IRole } from './IUser';

export default interface IUserModel {
  login(login:ILogin): Promise<string | null>
  findRole(login:ILogin): Promise<IRole | null>
}
