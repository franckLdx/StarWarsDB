'use strict';

const Datastore = require('nedb-promise');
const path = require('path');
const stream = require('stream');
const SwapiStream = require('swapi-stream');

module.exports = class {
  constructor(dbDir, dbName) {
    const filename = path.join(dbDir, dbName);
    this._db = new Datastore({ filename, autoload: true });
  }

  async reset(swapiResource, transform) {
    const transformer = new stream.Transform( { objectMode: true } )
    transformer._transform = function (chunk, encoding, done) {
      try {
        const t = transform(chunk)
        this.push(t);
        done();
      } catch (err) {
        done(err);
      }
    };
    await this._db.remove({}, {multi: true});
    return new Promise((resolve, reject) => {
      const swapiStream = SwapiStream.get(swapiResource).pipe(transformer);
      swapiStream.on('data', async data => await this._db.insert(data));
      swapiStream.on('end', resolve);
      swapiStream.on('error', (err) => reject(err));
    });
  }

  async count() {
    return this._db.count({});
  }

  async findAll() {
    return this._db.find({});
  }

  async find(query) {
    return this._db.find(query);
  }

  findBy(fieldName, value) {
    const query = {};
    query[fieldName] = {$regex: new RegExp(value, 'i')};
    const sortQuery = {};
    sortQuery[fieldName] = 1;
    return new Promise((resolve, reject) => {
      this._db.nedb.find(query).sort(sortQuery).exec((err, docs) => {
        if (err)
          reject(err);
        else
          resolve(docs);
      });
    });
  }

  async findOne(query) {
    return this._db.findOne(query);
  }

  async findById(id) {
    return this._db.findOne({_id: id});
  }

  async insert(object) {
    return this._db.insert(object);
  }


}
