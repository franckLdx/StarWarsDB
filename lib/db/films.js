'use strict';

const Datastore = require('./data-store');
const path = require('path');
const SwapiStream = require('swapi-stream');
const {fields2ids} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'films');
  }

  async reset() {
    return super.reset(SwapiStream.FILMS, swapi2StarWarsDB);
  }

}

const swapi2StarWarsDB = (film) => {
  film._id = film.episode_id;
  delete film.url;
  fields2ids(film, ['characters', 'vehicles', 'species', 'starships', 'planets']);
  return film;
}
