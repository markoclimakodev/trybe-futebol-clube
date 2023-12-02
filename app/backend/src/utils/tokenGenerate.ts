import * as jwt from 'jsonwebtoken';
import TokenPayload from '../Interfaces/User/TokenPayload';

export default function tokenGenerate(payLoad:TokenPayload):string {
  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const token = jwt.sign(payLoad, secret, { algorithm: 'HS256', expiresIn: '1d' });
  return token;
}
