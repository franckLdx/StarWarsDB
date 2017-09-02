'use strict';

const Datastore = require('./dataStore');
const path = require('path');
const {STARSHIPS} = require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'starships');
  }

  async ensureIndexes(){
    this._ensureIndex({ fieldName: 'name', unique: true });
  }

  async reset() {
    return super.reset(STARSHIPS, swapi2StarWarsDB);
  }

  async findByName(name) {
    return this.findBy('name', name);
  }

}

const swapi2StarWarsDB = (starship) => {
  starship._id = url2id(starship.url);
  delete starship.url;
  fields2ids(starship, ['pilots', 'films']);
  return starship;
}
