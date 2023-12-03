import ILogin from '../../Interfaces/User/ILogin'
export const user = {
  id: 1,
  user: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
}

export const validRequest: ILogin = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

export const missingEmail:Pick<ILogin,'password'> = {
  password: 'secret_admin'
}

export const missingPassword:Pick<ILogin,'email'> = {
  email: 'admin@admin.com',
}

export const invalidCredentials: ILogin = {
  email: 'admin@admin.com',
  password: 'wrongpassword'
}

export const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.Rn5CcVjahc'
export const role = {
  role: 'admin',

}