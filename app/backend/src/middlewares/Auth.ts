import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UnauthorizedError from '../helpers/ApiError/UnauthorizedError';

const IVALID_TOKEN = 'Token must be a valid token';

export default class Auth {
  static validate(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new UnauthorizedError('Token not found');

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) throw new UnauthorizedError(IVALID_TOKEN);

    const secret = process.env.JWT_SECRET || 'jwt_secret';

    const user = jwt.verify(token, secret);

    if (!user) {
      throw new UnauthorizedError(IVALID_TOKEN);
    }

    next();
  }
}
