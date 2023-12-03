import * as joi from 'joi';
import ILogin from '../../Interfaces/User/ILogin';

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export function loginFieldsValiation(login:ILogin) {
  if (!login.email) {
    return true;
  }

  if (!login.password) {
    return true;
  }
}

export function loginValuesValidation(login:ILogin) {
  const { error } = loginSchema.validate(login);
  if (error) return true;
}
