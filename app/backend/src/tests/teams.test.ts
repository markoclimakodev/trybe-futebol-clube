import * as chai from 'chai';
import { afterEach, before, beforeEach } from 'mocha';
import * as sinon from 'sinon';
import { app } from '../app';
// @ts-ignore
import chaiHttp = require('chai-http');

import { Response } from 'superagent';
import Teams from '../database/models/Teams';
import { getTeamsMock } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('GET /teams', () => {
  let res: Response;

  before(async () => {
    sinon.stub(Teams, 'findAll').resolves(getTeamsMock as Teams[])
    res = await chai.request(app).get('/teams')
  })

  afterEach(() => {
    sinon.restore()
  })

  it('should return status 200 and all teams', async () => {
    expect(res.status).to.be.equal(200)
    expect(res.body).to.be.deep.equal(getTeamsMock);
  })

})

describe('GET /teams/:id', () => {
  let res: Response;

  afterEach(() => {
    sinon.restore()
  })

  beforeEach(async () => {
    sinon.stub(Teams, 'findByPk').resolves(getTeamsMock[4] as Teams)
    res = await chai.request(app).get('/teams/5')
  })

  it('should return status 200 and the team by ID', async () => {
    expect(res.status).to.be.equal(200)
    expect(res.body).to.be.deep.equal(getTeamsMock[4])
  })

})

describe('GET /teams/:id - Error when team is not found', () => {
  let res: Response;

  afterEach(() => {
    sinon.restore()
  })

  beforeEach(async () => {
    sinon.stub(Teams, 'findByPk').resolves(null)
    res = await chai.request(app).get('/teams/999')
  })

  it('should return a message "Team not found"', async () => {
    expect(res.body).to.be.deep.equal({ message: 'Team not found' });
  })

})


