'use strict';

const Films = require('./films');
const People = require('./people');

module.exports.loadDB = (dbDir) => {
  const films = new Films(dbDir);
  const people = new People(dbDir);

  return {
    get films() { return films; },
    get people() { return people; }
  }

}