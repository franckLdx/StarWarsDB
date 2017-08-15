'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Starships tests', () => {
  let sandbox;
  let starships;

  before(() => {
    const db = require('../../db').loadDB();
    starships = db.starships;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(30000);
    await starships.reset();
    const count = await starships.count();
    assert(count === 37);
  });
});