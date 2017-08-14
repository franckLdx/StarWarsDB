'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {PEOPLE} = require('swapi-stream');
const {url2id, fields2ids} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'people');
  }

  async reset() {
    return super.reset(PEOPLE, swapi2StarWarsDB);
  }
}

const swapi2StarWarsDB = (people) => {
  people.id = url2id(people.url);
  delete people.url;
  people.homeworld = url2id(people.homeworld);
  fields2ids(people, ['films', 'species', 'vehicles', 'starships']);
  return people;
}
