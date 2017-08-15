'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Species tests', () => {
  let sandbox;
  let species;

  before(() => {
    const db = require('../../db').loadDB();
    species = db.species;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(30000);
    await species.reset();
    const count = await species.count();
    assert(count === 37);
  });
});