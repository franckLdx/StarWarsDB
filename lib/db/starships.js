'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {STARSHIPS} = require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'starships');
  }

  async reset() {
    return super.reset(STARSHIPS, swapi2StarWarsDB);
  }
}

const swapi2StarWarsDB = (starship) => {
  starship.id = url2id(starship.url);
  delete starship.url;
  fields2ids(starship, ['pilots', 'films']);
  return starship;
}
