'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {PLANETS} = require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'planets');
  }

  async ensureIndexes(){
    this._ensureIndex({ fieldName: 'name', unique: true });
  }

  async reset() {
    return super.reset(PLANETS, swapi2StarWarsDB);
  }

  async findByName(name) {
    return this.findBy('name', name);
  }
}

const swapi2StarWarsDB = (planet) => {
  planet._id = url2id(planet.url);
  delete planet.url;
  fields2ids(planet, ['residents', 'films']);
  return planet;
}
