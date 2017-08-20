'use strict';

const { homedir } = require('os');
const { join } = require('path');

const http = require('http');

const { loadDB } = require('./lib/db');
const { createApp } = require('./lib/graphql/app');

function startServer ({port, app}) {
  return new Promise((resolve, reject) => {
    const actualPort = port || 8080;
    const server = http.createServer(app);
    server.listen(actualPort);
    server.once('listening', () => resolve(server));
    server.once('error', err => reject(err));
  });
}

async function main() {
  const dbDdir = join(homedir(), '.StarWarsDB');

  const db = await loadDB(dbDdir);
  await db.reset();
  const app = await createApp({
    url: '/api/starWars',
    db,
    graphiql: true
  });
  const server = await startServer({port: 8080, app: app});
  console.log(`GraphQL listening at ${server.address().port}`);
}

main()
  .catch(err => console.error(err));
