import * as joi from 'joi';
import ILogin from '../../Interfaces/User/ILogin';

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export function loginFieldsValiation(login:ILogin) {
  if (!login.email) {
    return 'All fields must be filled';
  }

  if (!login.password) {
    return 'All fields must be filled';
  }
}

export function loginValuesValidation(login:ILogin) {
  const { error } = loginSchema.validate(login);
  if (error) return 'Invalid email or password';
}
