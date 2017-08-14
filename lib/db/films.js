'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {FILMS} = require('swapi-stream');
const {fields2ids, url2id} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'films');
  }

  async reset() {
    return super.reset(FILMS, swapi2StarWarsDB);
  }

}

const swapi2StarWarsDB = (film) => {
  film._id = url2id(film.url);
  delete film.episode_id;
  delete film.url;
  fields2ids(film, ['characters', 'vehicles', 'species', 'starships', 'planets']);
  return film;
}
