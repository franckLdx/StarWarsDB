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
      const swapiStream = SwapiStream.get(swapiResource)
      const transformed = swapiStream.pipe(transformer);
      transformed.on('data', async data => {
        try { await this._db.insert(data) } catch (err) { debugger;this.emit('error', err); }
      });
      transformed.on('end', resolve);
      transformed.on('error', (err) => { debugger; reject(err)});
      swapiStream.on('error', (err) => { debugger; reject(err)});
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

  async _ensureIndex(options) {
    return new Promise((resolve, reject) =>{
      this._db.ensureIndex(options, function (err) {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

}
