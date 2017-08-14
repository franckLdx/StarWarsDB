'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Vehicles tests', () => {
  let sandbox;
  let vehicles;

  before(() => {
    const db = require('..//db').loadDB();
    vehicles = db.vehicles;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(30000);
    await vehicles.reset();
    const count = await vehicles.count();
    assert(count === 39);
  });
});