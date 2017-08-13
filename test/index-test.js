'use strict';

const StarWars = require('../index').StarWarsDB;

const assert = require('assert');
const fs = require('fs-extra');
const os = require('os');
const path = require('path');
const sinon = require('sinon');

describe('DB tests', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  })
  afterEach(() => {
    sandbox.restore();
  })

  describe('Directory tests', () => {
    it('Should use the given directory', () => {
      const dir = path.join('.', 'foo')
      const stub = sandbox.stub(fs, 'ensureDirSync');
      const db = new StarWars();
      stub.calledWith(dir);
    });
    it('Should use the default directory', () => {
      const stub = sandbox.stub(fs, 'ensureDirSync');
      const db = new StarWars();
      stub.calledWith(path.join(os.homedir(), '.StarWarsDB'));
    });
    it('Should throw an exception when directory creation failed', () => {
      const error = 'no no';
      const stub = sandbox.stub(fs, 'ensureDirSync').throws(error);
      assert.throws(() => new StarWars(), error);
    });
  });

});
