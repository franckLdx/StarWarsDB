'use strict';

const assert = require('assert');
const sinon = require('sinon');

describe('Films tests', () => {
  let sandbox;
  let films

  before(async () => {
    const db = await require('../../db').loadDB();
    films = db.films;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('reset', async function() {
    this.timeout(30000);
    await films.reset();
    const count = await films.count();
    assert(count === 7);
  });

  it('findByEpisodeId', async () => {
    const expectedResult = {foo: 'bar'};
    const mock = sandbox.mock(films);
    mock.expects('findOne').once().withExactArgs({episode_id:1}).returns(expectedResult);
    const actualResult = await films.findByEpisodeId(1);
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });

  it('findByTitle', async () => {
    const title = 'May the force be with you';
    const expectedResult = {foo: 'bar'};
    const mock = sandbox.mock(films);
    mock.expects('find').once().withExactArgs({title: {$regex: new RegExp(title, 'i')}}).returns(expectedResult);
    const actualResult = await films.findByTitle(title);
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });
});