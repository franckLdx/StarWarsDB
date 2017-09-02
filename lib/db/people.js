'use strict';

const Datastore = require('./dataStore');
const path = require('path');
const {PEOPLE} = require('swapi-stream');
const {url2id, fields2ids} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'people');
  }

  async ensureIndexes(){
    this._ensureIndex({ fieldName: 'name', unique: true });
  }

  async reset() {
    return super.reset(PEOPLE, swapi2StarWarsDB);
  }

  async findByName(name) {
    return this.findBy('name', name);
  }
}

const swapi2StarWarsDB = (people) => {
  people._id = url2id(people.url);
  delete people.url;
  people.homeworld = url2id(people.homeworld);
  fields2ids(people, ['films', 'species', 'vehicles', 'starships']);
  return people;
}
