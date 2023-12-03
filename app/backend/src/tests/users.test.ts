import * as chai from 'chai';
import * as jwt from 'jsonwebtoken';
import { afterEach } from 'mocha';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import { fieldMissing, invalidLogin, token } from './mocks/loginMock';
import { user } from './mocks/usersMock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);
const { expect } = chai;

describe('Users Test', function () {
  it('should login successfully', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(user as any)
    sinon.stub(jwt, 'sign').resolves(token)

    const res = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    })

    expect(res.status).to.be.deep.equal(200)
    expect(res.body).to.be.deep.equal({ token })
  })

  it('should not login if password missing ', async function () {
    const res = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
    })

    expect(res.status).to.be.deep.equal(400)
    expect(res.body).to.be.deep.equal(fieldMissing)
  })

  it('should not login if email missing ', async function () {
    const res = await chai.request(app).post('/login').send({
      password: 'secret_admin'
    })

    expect(res.status).to.be.deep.equal(400)
    expect(res.body).to.be.deep.equal(fieldMissing)
  })

  it('should not login with wrong credentials ', async function () {

    const res = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'wrongpassword'
    })

    expect(res.status).to.be.deep.equal(401)
    expect(res.body).to.be.deep.equal(invalidLogin)
  })


  afterEach(sinon.restore);

})


