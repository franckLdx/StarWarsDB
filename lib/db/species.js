'use strict';

const Datastore = require('./dataStore');
const path = require('path');
const {SPECIES}= require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'species');
  }

  async ensureIndexes(){
    return Promise.all([
      this._ensureIndex({ fieldName: 'name', unique: true }),
      this._ensureIndex({ fieldName: 'classification', unique: false }),
      this._ensureIndex({ fieldName: 'designation', unique: false })
    ]);
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
