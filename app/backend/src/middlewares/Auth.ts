import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UnauthorizedError from '../helpers/ApiError/UnauthorizedError';

const TOKEN_NOT_FOUND = 'Token not found';
const INVALID_TOKEN = 'Token must be a valid token';

export default class Auth {
  static async validate(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new UnauthorizedError(TOKEN_NOT_FOUND);
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedError(INVALID_TOKEN);
    }

    try {
      const user = jwt.verify(token, process.env.JWT_SECRET ?? 'jwt_secret');

      if (!user) {
        throw new UnauthorizedError(INVALID_TOKEN);
      }

      req.body = user;
      next();
    } catch (error) {
      throw new UnauthorizedError(INVALID_TOKEN);
    }
  }
}
