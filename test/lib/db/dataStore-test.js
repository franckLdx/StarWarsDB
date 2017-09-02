'use strict';

const Datastore = require('../../../lib/db/dataStore');

const assert = require('assert');
const {ensureDirSync, emptyDirSync, removeSync}  = require('fs-extra');
const {FILMS} = require('swapi-stream');
const {tmpdir} = require('os');
const {join} = require('path');
const sinon = require('sinon');

describe('Datastore tests', () => {
  const DIR = join(tmpdir(), 'datastoreTest');
  let sandbox;
  let dataStore;
  let _dbMock;

  before(() => {
    ensureDirSync(DIR);
    dataStore = new Datastore(DIR, 'test');
  });

  after(() => {
    emptyDirSync(DIR);
  });

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    _dbMock = sandbox.mock(dataStore._db);
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('reset', async () => {
    _dbMock.expects('remove').once().resolves();
    _dbMock.expects('insert').exactly(7).resolves();
    await dataStore.reset(FILMS, data => data);
    _dbMock.verify();
  });

  it('reset: remove failed', async () => {
    const error = new Error('No no');
    let actualError;
    _dbMock.expects('remove').once().rejects(error);
    try {
      await dataStore.reset()
    } catch (err) {
      actualError = err
    }
    _dbMock.verify();
    assert.deepStrictEqual(actualError, error);
  });

  it('reset: http request failed', async () => {
    _dbMock.expects('remove').once().resolves();
    let actualError;
    try {
      await dataStore.reset('dummy', data => data);
    } catch (err) {
      actualError = err;
    }
    _dbMock.verify();
    assert.ok(actualError !== undefined);
  });

  it('reset: insert failed', async () => {
    _dbMock.expects('remove').once().resolves();
    let actualError;
    try {
      await dataStore.reset('dummy', data => data);
    } catch (err) {
      actualError = err;
    }
    _dbMock.verify();
    assert.ok(actualError !== undefined);
  });

  it('count', async () => {
    const expectedResult = 1390;
    _dbMock.expects('count').once().resolves(expectedResult);
    const actualResult = await dataStore.count();
    assert.deepStrictEqual(expectedResult, actualResult);
    _dbMock.verify();
  });

  it('findAll', async () => {
    const expectedResult = [{id:1}, {id:2}];
    _dbMock.expects('find').once().withExactArgs({}).resolves(expectedResult);
    const actualResult = await dataStore.findAll();
    assert.deepStrictEqual(expectedResult, actualResult);
    _dbMock.verify();
  });

  it('find', async () => {
    const expectedQuery = {id:1};
    const expectedResult = [{id:1}, {id:2}];
    _dbMock.expects('find').once().withExactArgs(expectedQuery).resolves(expectedResult);
    const actualResult = await dataStore.find(expectedQuery);
    assert.deepStrictEqual(expectedResult, actualResult);
    _dbMock.verify();
  });

  it('findOne', async () => {
    const expectedQuery = {id:1};
    const expectedResult = {id:2,name:'foo'};
    _dbMock.expects('findOne').once().withExactArgs(expectedQuery).resolves(expectedResult);
    const actualResult = await dataStore.findOne(expectedQuery);
    assert.deepStrictEqual(expectedResult, actualResult);
    _dbMock.verify();
  });

  it('findById', async () => {
    const expectedQuery = {_id:1};
    const expectedResult = {id:2,name:'foo'};
    _dbMock.expects('findOne').once().withExactArgs(expectedQuery).resolves(expectedResult);
    const actualResult = await dataStore.findById(1);
    assert.deepStrictEqual(expectedResult, actualResult);
    _dbMock.verify();
  });

});
