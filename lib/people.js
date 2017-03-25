'use strict';

const Datastore = require('./Datastore');
const path = require('path');
const SwapiStream = require('swapi-stream');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'people');
  }

  async reset() {
    return this._reset(SwapiStream.PEOPLE, (people) => {
      console.log(people);
      return people;
    });
  }
}
