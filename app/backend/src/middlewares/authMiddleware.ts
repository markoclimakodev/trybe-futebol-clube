import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'jwt_secret';
    const user = jwt.verify(authorization, secret);
    req.body.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
