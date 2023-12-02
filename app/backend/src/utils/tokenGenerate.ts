import * as jwt from 'jsonwebtoken';
import ILogin from '../Interfaces/User/ILogin';

export default function tokenGenerate(payLoad:ILogin):string {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const token = jwt.sign(payLoad, secret, { expiresIn: '1h' });
  return token;
}
