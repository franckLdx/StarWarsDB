'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Films tests', () => {
  let sandbox;
  let films

  before(() => {
    const db = require('..//db').loadDB();
    films = db.films;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(30000);
    await films.reset();
    const count = await films.count();
    assert(count === 7);
  });
});