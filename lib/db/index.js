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
  const starships = new Starships(dbDir);
  const vehicles = new Vehicles(dbDir);

  films.ensureIndexes();
  people.ensureIndexes();
  planets.ensureIndexes();
  species.ensureIndexes();
  starships.ensureIndexes();
  vehicles.ensureIndexes();

  return {
    get films() { return films; },
    get people() { return people; },
    get planets() { return planets; },
    get species() { return species; },
    get starships() { return starships; },
    get vehicles() { return vehicles; },

    async reset() {
      return Promise.all(
        [films, people, planets, species, vehicles, starships].map(
          dbResource => dbResource.reset()
        )
      );
    }
  }

}