import * as chai from 'chai';
import { afterEach } from 'mocha';
import * as sinon from 'sinon';
import { Response } from 'superagent';
import { app } from '../app';
import { invalidCredentials, invalidToken, missingEmail, missingPassword, validRequest } from './mocks/usersMock';
// @ts-ignore
import chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai;

describe('Users Test', () => {
  let res: Response;
  let userToken: string;

  describe('POST "/login"', () => {
    describe('Successful Login', () => {
      it('should login successfuly', async () => {
        res = await chai.request(app).post('/login').send(validRequest)
        const { token } = res.body;
        userToken = token

        expect(res.status).to.be.deep.equal(200)
        expect(token).to.be.string;
      })


    })

    describe('Login Errors', () => {
      it('should not login if email is missing', async () => {
        res = await chai.request(app).post('/login').send(missingEmail)
        const { message } = res.body;

        expect(res.status).to.be.equal(400)
        expect(message).to.be.deep.equal('All fields must be filled')
      })

      it('should not login if password is missing', async () => {
        res = await chai.request(app).post('/login').send(missingPassword)
        const { message } = res.body;

        expect(res.status).to.be.equal(400)
        expect(message).to.be.deep.equal('All fields must be filled')
      })

      it('should not login with wrong email or password', async () => {
        res = await chai.request(app).post('/login').send(invalidCredentials)
        const { message } = res.body;

        expect(res.status).to.be.equal(401)
        expect(message).to.be.deep.equal('Invalid email or password')
      })
    })


  })

  describe('GET "/login/role"', () => {
    describe('Role Errors', () => {

      it('should return a role with valid token', async () => {
        res = await chai
          .request(app)
          .get('/login/role')
          .set('authorization', `Bearer ${userToken}`);

        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.deep.equal({ role: 'admin' });
      });

      it('should not return a role if token is invalid', async () => {
        res = await chai.request(app).get('/login/role').set('authorization', invalidToken)
        const { message } = res.body

        expect(res.status).to.be.equal(401)
        expect(message).to.be.equal('Token must be a valid token')

      })

      it('should not return a role if token missing', async () => {
        res = await chai.request(app).get('/login/role')
        const { message } = res.body

        expect(res.status).to.be.equal(401)
        expect(message).to.be.deep.equal('Token not found')

      })

    })
  })

})

