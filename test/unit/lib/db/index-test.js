'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('DB', () => {
  let db;
  let sandbox;

  before(async () => {
    db = await require('../../db').loadDB();
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('should reset all resources', async function () {
    this.timeout(60000);;
    const spies = [db.films, db.people, db.planets, db.species, db.vehicles, db.starships].map(
      dbResource => sandbox.spy(dbResource, 'reset')
    )
    await db.reset();
    spies.forEach(
      spy => assert.deepStrictEqual(spy.calledOnce, true)
    );
  });
})