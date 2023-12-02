import { NextFunction, Request, Response } from 'express';
import { loginFieldsValiation, loginValuesValidation } from '../utils/validation/loginValidation';

export default function validateLogin(req:Request, res:Response, next:NextFunction) {
  const loginError = loginFieldsValiation(req.body);
  if (loginError) return res.status(400).json({ message: loginError });

  const valuesError = loginValuesValidation(req.body);
  if (valuesError) return res.status(401).json({ message: valuesError });

  next();
}
