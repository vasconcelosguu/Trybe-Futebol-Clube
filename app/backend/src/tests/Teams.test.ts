import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/Teams';
import teams from './helpers/Teams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing if the route is OK"', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('Testing Teams Search is OK', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    const { status } = await chai.request(app).get('/teams').send(teams);
    expect(status).to.be.eq(200);
  });
});

describe('Testing the search in :id is OK', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('complementational Test', async () => {
    sinon.stub(TeamModel, 'findByPk').resolves(teams[0] as TeamModel);
    const { status } = await chai.request(app).get('/teams/:id').send(teams);
    expect(status).to.be.eq(200);
  });
});