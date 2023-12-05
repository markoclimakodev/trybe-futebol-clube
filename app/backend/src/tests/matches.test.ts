import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';
import { validRequest } from './mocks/usersMock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;


describe('Matches Test', function () {
  let res: Response;
  let userToken: string;


  it('should login successfuly', async () => {
    res = await chai.request(app).post('/login').send(validRequest)
    const { token } = res.body;
    userToken = token


  })

  it('should return status 200 and return all matches', async function () {
    res = await chai.request(app).get('/matches')
    const { status } = res

    expect(status).to.be.equal(200);
  })

  it('should return status 200 and return all matches in progress', async function () {
    res = await chai.request(app).get('/matches?inProgress=true')
    const { status } = res

    expect(status).to.be.equal(200);
  })

  it('should return status 200 and return all matches finished', async function () {
    res = await chai.request(app).get('/matches?inProgress=false')
    const { status } = res

    expect(status).to.be.equal(200);
  })

  it('should return status 201 and and create a match', async function () {
    res = await chai
      .request(app)
      .post('/matches')
      .set('authorization', `Bearer ${userToken}`)
      .send({
        homeTeamId: 7,
        awayTeamId: 11,
        homeTeamGoals: 3,
        awayTeamGoals: 0
      });

    const { status } = res

    expect(status).to.be.equal(201);

  })

  it('should return status 20 and and finish a match', async function () {
    res = await chai
      .request(app)
      .patch('/matches/48/finish')
      .set('authorization', `Bearer ${userToken}`);

    const { status, body } = res

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(
      { message: 'Finished' }
    );


  })

  it('should return status 20 and and finish a match', async function () {
    res = await chai
      .request(app)
      .patch('/matches/48')
      .set('authorization', `Bearer ${userToken}`).send({
        "homeTeamGoals": 1,
        "awayTeamGoals": 3
      });

    const { status, body } = res

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(
      {
        message: "Match updated"
      }
    );
  })

})
