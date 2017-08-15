'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('People tests', () => {
  let sandbox;
  let people

  before(() => {
    const db = require('../../db').loadDB();
    people = db.people;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(30000);
    await people.reset();
    const count = await people.count();
    assert(count === 87);
  });
});