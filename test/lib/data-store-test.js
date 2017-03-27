'use strict';

const Datastore = require('../../lib/data-store');

const assert = require('assert');
const fs = require('fs-promise');
const os = require('os');
const path = require('path');
const sinon = require('sinon');

describe('Datastore tests', () => {
  const FILE = 'testDB';
  let sandbox;

  before(() => {
    fs.removeSync(path.join(os.tmpdir(), FILE));
  });
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  it('Should create an empty db', async() => {

  });
});
