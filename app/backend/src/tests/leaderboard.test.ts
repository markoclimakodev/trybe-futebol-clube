import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;


describe('LeaderBoard Test', function () {
  let res: Response;

  it('should return status 200 for /leaderboard endpoint', async function() {
    res = await chai.request(app).get('/leaderboard')
    const {status} = res

    expect(status).to.be.equal(200);

  })

  it('should return status 200 for /leaderboard/home endpoint', async function() {
    res = await chai.request(app).get('/leaderboard/home')
    const {status} = res

    expect(status).to.be.equal(200);
  })


  it('should return status 200 for /leaderboard/away endpoint', async function() {
    res = await chai.request(app).get('/leaderboard/away')
    const {status} = res

    expect(status).to.be.equal(200);
  })


})
