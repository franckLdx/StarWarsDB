
const Db = require('../../lib/db');

const os = require('os');
const path = require('path');
const fs = require('fs-extra');

const dbDir = path.join(os.tmpdir(), 'testDB');
fs.removeSync(dbDir);

const db = Db.loadDB(dbDir);

module.exports.loadDB = () => db;
