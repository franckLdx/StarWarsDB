'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Planets tests', () => {
  let sandbox;
  let planets

  before(async () => {
    const db = await require('../../db').loadDB();
    planets = db.planets;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset tests', async function() {
    this.timeout(60000);
    await planets.reset();
    const count = await planets.count();
    assert.ok(count === 61);
  });

  it('findByName', async () => {
    const name = 'Coruscant';
    const expectedResult = [{foo: 'bar'}];
    const mock = sandbox.mock(planets);
    mock.expects('findBy').once().withExactArgs('name', name).returns(expectedResult);
    const actualResult = await planets.findByName(name);
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });
});