import * as chai from 'chai';
import { afterEach } from 'mocha';
import * as sinon from 'sinon';
import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { teams } from './mocks/teamsMock';
// @ts-ignore
import chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;


describe('Teams Test', function () {

  it('should return all teams', async function() {
    sinon.stub(SequelizeTeam,'findAll').resolves(teams as any)

    const {status,body} = await chai.request(app).get('/teams')
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teams);
  })

  it('should return a team by id', async function() {
    sinon.stub(SequelizeTeam,'findOne').resolves(teams[0] as any)

    const {status,body} = await chai.request(app).get('/teams/1')
    expect(status).to.be.equal(200);
    expect(body).to.deep.equal(teams[0]);
  })

  it('should return not found if the team doesn\'t exists', async function() {
    sinon.stub(SequelizeTeam,'findOne').resolves(null)

    const {status,body} = await chai.request(app).get('/teams/999')
    expect(body.message).to.be.equal('Team not found')
  })

  afterEach(sinon.restore);

})
