'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {VEHICLES} = require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'vehicles');
  }

  async reset() {
    return super.reset(VEHICLES, swapi2StarWarsDB);
  }

  async findByName(name) {
    return this.findBy('name', name);
  }
}

const swapi2StarWarsDB = (vehicle) => {
  vehicle._id = url2id(vehicle.url);
  delete vehicle.url;
  fields2ids(vehicle, ['pilots', 'films']);
  return vehicle;
}
