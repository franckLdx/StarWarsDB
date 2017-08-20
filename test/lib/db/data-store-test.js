'use strict';

const Datastore = require('../../../lib/db/data-store');

const assert = require('assert');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const sinon = require('sinon');

describe('Datastore tests', () => {
  const FILE = 'testDB';
  let sandbox;
  let films;

  before(async () => {
    fs.removeSync(path.join(os.tmpdir(), FILE));
    const db = await require('../../db').loadDB();
    films = db.films;
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('count', async () => {
    const expectedResult = 1390;
    const mock = sandbox.mock(films._db);
    mock.expects('count').once().returns(expectedResult);
    const actualResult = await films.count();
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });

  it('findAll', async () => {
    const expectedResult = [{id:1}, {id:2}];
    const mock = sandbox.mock(films._db);
    mock.expects('find').once().withExactArgs({}).returns(expectedResult);
    const actualResult = await films.findAll();
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });

  it('find', async () => {
    const expectedQuery = {id:1};
    const expectedResult = [{id:1}, {id:2}];
    const mock = sandbox.mock(films._db);
    mock.expects('find').once().withExactArgs(expectedQuery).returns(expectedResult);
    const actualResult = await films.find(expectedQuery);
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });

  it('findOne', async () => {
    const expectedQuery = {id:1};
    const expectedResult = {id:2,name:'foo'};
    const mock = sandbox.mock(films._db);
    mock.expects('findOne').once().withExactArgs(expectedQuery).returns(expectedResult);
    const actualResult = await films.findOne(expectedQuery);
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });

  it('findById', async () => {
    const expectedQuery = {_id:1};
    const expectedResult = {id:2,name:'foo'};
    const mock = sandbox.mock(films._db);
    mock.expects('findOne').once().withExactArgs(expectedQuery).returns(expectedResult);
    const actualResult = await films.findById(1);
    assert.deepStrictEqual(expectedResult, actualResult);
    mock.verify();
  });

});
