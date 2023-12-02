import ILogin from './ILogin';

export default interface IUserModel {
  login(login:ILogin): Promise<string | null>
}
