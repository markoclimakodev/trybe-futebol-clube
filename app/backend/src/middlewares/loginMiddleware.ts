import { NextFunction, Request, Response } from 'express';
import BadRequestError from '../helpers/ApiError/BadRequestError';
import UnauthorizedError from '../helpers/ApiError/UnauthorizedError';
import { loginFieldsValiation, loginValuesValidation } from '../utils/validation/loginValidation';

export default function validateLogin(req:Request, res:Response, next:NextFunction) {
  const loginError = loginFieldsValiation(req.body);
  if (loginError) throw new BadRequestError('All fields must be filled');

  const valuesError = loginValuesValidation(req.body);
  if (valuesError) throw new UnauthorizedError('Invalid email or password');

  next();
}
