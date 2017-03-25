'use strict';

const Datastore = require('nedb-promise');
const eventToPromise = require('events-to-any-promise');
const path = require('path');
const stream = require('stream');
const SwapiStream = require('swapi-stream');

const foo = new RegExp("http://swapi.co/api/.*/(.+)/");

module.exports = class {
  constructor(dbDir, dbName) {
    const filename = path.join(dbDir, dbName);
    this._db = new Datastore({ filename, autoload: true });
  }

  async _reset(swapiResource, transform) {
    const transformer = new stream.Transform( { objectMode: true } )
    transformer._transform = function (chunk, encoding, done) {
      const t = transform(chunk)
      this.push(t);
      done();
    };
    await this._db.remove({}, {multi: true});
    const swapiStream= SwapiStream.get(swapiResource).pipe(transformer);
    swapiStream.on('data', async data => await this._db.insert(data));
    return eventToPromise(swapiStream, 'end');
  }

  async count() {
    return this._db.count({});
  }
}
