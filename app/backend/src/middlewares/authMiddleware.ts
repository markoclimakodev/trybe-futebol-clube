import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import UnauthorizedError from '../helpers/ApiError/UnauthorizedError';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) throw new UnauthorizedError('Token not found');
  const token = authorization.split(' ')[1];

  const secret = process.env.JWT_SECRET || 'jwt_secret';
  const user = jwt.verify(token, secret);

  if (!user) throw new UnauthorizedError('Token must be a valid token');

  next();
}
