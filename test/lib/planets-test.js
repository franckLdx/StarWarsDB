'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Planets tests', () => {
  let sandbox;
  let planets

  before(() => {
    const db = require('..//db').loadDB();
    planets = db.planets;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(30000);
    await planets.reset();
    const count = await planets.count();
    assert(count === 61);
  });
});