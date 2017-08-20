'use strict';

const { ensureDir } = require('fs-extra');

const Films = require('./films');
const People = require('./people');
const Planets = require('./planets');
const Species = require('./species');
const Vehicles = require('./vehicles');
const Starships = require('./starships');

module.exports.loadDB = async (dbDir) => {
  await ensureDir(dbDir);

  const films = new Films(dbDir);
  const people = new People(dbDir);
  const planets = new Planets(dbDir);
  const species = new Species(dbDir);
  const vehicles = new Vehicles(dbDir);
  const starships = new Starships(dbDir);

  return {
    get films() { return films; },
    get people() { return people; },
    get planets() { return planets; },
    get species() { return species; },
    get vehicles() { return vehicles; },
    get starships() { return starships; },

    async reset() {
      return Promise.all(
        [films, people, planets, species, vehicles, starships].map(
          dbResource => dbResource.reset()
        )
      );
    }
  }

}