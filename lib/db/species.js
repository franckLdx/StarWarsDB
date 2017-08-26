'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {SPECIES}= require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'species');
  }

  async findByName(name) {
    return this.findBy('name', name);
  }

  findByClassification(classification) {
    return this.findBy('classification', classification);
  }

  findByDesignation(designation) {
    return this.findBy('designation', designation);
  }

  async reset() {
    return super.reset(SPECIES, swapi2StarWarsDB);
  }
}

const swapi2StarWarsDB = (specie) => {
  specie._id = url2id(specie.url);
  delete specie.url;
  specie.homeworld = url2id(specie.homeworld);
  if (specie.classification === 'mammals') {
    specie.classification = 'mammal'
  }
  fields2ids(specie, ['people', 'films']);
  return specie;
}
