'use strict';

const Datastore = require('./data-store');
const path = require('path');
const {FILMS} = require('swapi-stream');
const {url2id, fields2ids} = require('./tools');

module.exports = class extends Datastore {
  constructor(dbDir) {
    super(dbDir, 'films');
  }

  async reset() {
    return super.reset(FILMS, swapi2StarWarsDB);
  }

  async findByEpisodeId(id) {
    return this.findOne({episode_id: id});
  }

  async findByTitle(title) {
    return this.findBy('title', title);
  }
}

const swapi2StarWarsDB = (film) => {
  film._id = url2id(film.url);;
  delete film.url;
  film.producers = film.producer.split(',');
  delete film.producer;
  fields2ids(film, ['characters', 'vehicles', 'species', 'starships', 'planets']);
  return film;
}
