import { NextFunction, Request, Response } from 'express';
import * as joi from 'joi';
import ILogin from '../Interfaces/User/ILogin';
import BadRequestError from '../helpers/ApiError/BadRequestError';
import UnauthorizedError from '../helpers/ApiError/UnauthorizedError';

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

const loginfieldsSchema = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

export default class Login {
  static loginFieldsValidation(login: ILogin) {
    const { error } = loginfieldsSchema.validate(login);
    return !!error;
  }

  static loginValuesValidation(login: ILogin) {
    const { error } = loginSchema.validate(login);
    return !!error;
  }

  static validate(req: Request, res: Response, next: NextFunction) {
    const loginError = Login.loginFieldsValidation(req.body);
    if (loginError) {
      throw new BadRequestError('All fields must be filled');
    }

    const valuesError = Login.loginValuesValidation(req.body);
    if (valuesError) {
      throw new UnauthorizedError('Invalid email or password');
    }
    next();
  }
}
