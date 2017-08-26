'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('People tests', () => {
  let sandbox;
  let people

  before(async () => {
    const db = await require('../../db').loadDB();
    people = db.people;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset', async function() {
    this.timeout(60000);
    await people.reset();
    const count = await people.count();
    assert.ok(count === 87);
  });

  it('findByName', async () => {
    const name = 'double';
    const expectedResult = {foo: 'bar'};
    const mock = sandbox.mock(people);
    mock.expects('findBy').once().withExactArgs('name', name).returns(expectedResult);
    const actualResult = await people.findByName(name);
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });

});