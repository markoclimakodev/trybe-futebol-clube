import * as jwt from 'jsonwebtoken';
import TokenPayload from '../Interfaces/User/TokenPayload';

export default class JWTTokenGenerator {
  static generateToken(payload: TokenPayload): string {
    const secret = process.env.JWT_SECRET ?? 'jwt_secret';
    const tokenExpiration = { expiresIn: '8h' };
    return jwt.sign(payload, secret, tokenExpiration);
  }
}
