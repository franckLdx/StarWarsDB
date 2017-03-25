'use strict';

const os = require('os');
const path = require('path');
const fs = require('fs-promise');

const Films = require('./lib/films');
const People = require('./lib/people');

exports.StarWarsDB = class {
  constructor(dir = path.join(os.homedir(), '.StarWarsDB')) {
    this._dbDir = dir;
    fs.ensureDirSync(dir);
  }

  getFilms() {
    return new Films(this._dbDir);
  }

  getPeople() {
    return new People(this._dbDir);
  }

}
