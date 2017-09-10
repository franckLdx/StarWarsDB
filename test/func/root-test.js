const { homedir } = require('os');
const { join } = require('path');
const { loadDB } = require('../../lib/db');
const { createApp } = require('../../lib/graphql/app');

const request = require('supertest');
const assert = require('assert');

const dbDdir = join(homedir(), '.StarWarsDB');
const API_URL = '/api/starWars';

let app, db;

before(async () => {
  db = await loadDB(dbDdir);

  app = await createApp({
    url: API_URL,
    db,
    graphiql: true
  });
});

module.exports.doRequest = async function(query, ...checkers) {
	return requestP = request(app)
		.get(API_URL)
    .query({query});
}

module.exports.checkOk = (response) => {
  if (response.body.errors) {
    throw new Error(response.body.errors[0].message);
  }
}
