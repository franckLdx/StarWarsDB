'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {SPECIES}= require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'species');
  }

  async reset() {
    return super.reset(SPECIES, swapi2StarWarsDB);
  }
}

const swapi2StarWarsDB = (specy) => {
  specy.id = url2id(specy.url);
  delete specy.url;
  specy.homeworld = url2id(specy.homeworld);
  fields2ids(specy, ['people', 'films']);
  return specy;
}
