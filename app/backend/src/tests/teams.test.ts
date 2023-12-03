import * as chai from 'chai';
import { Response } from 'superagent';
import { app } from '../app';
import { teams } from './mocks/teamsMock';

// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;


describe('Teams Test', function () {
  let res: Response;

  it('should return all teams', async function() {
    res = await chai.request(app).get('/teams')
    const {status,body} = res

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teams);
  })

  it('should return a team by id', async function() {
    res = await chai.request(app).get('/teams/1')
    const {status, body} =  res

    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teams[0]);
  })

  it('should return not found if the team doesn\'t exists', async function() {
    res =  await chai.request(app).get('/teams/999')
    const {body} =res
    
    expect(body.message).to.be.equal('Team not found')
  })

})
