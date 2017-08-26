const app = require('express')();
const schema = require('../graphql/schema');
const graphqlHTTP = require('express-graphql');

module.exports.createApp = ({url, db, graphiql}) => {
  app.use(url, graphqlHTTP({
    schema: schema,
    graphiql: graphiql || false,
    context: {
      filmsDb: db.films,
      peopleDb: db.people,
      planetsDb: db.planets,
      speciesDb: db.species,
      starshipsDb: db.starships,
      vehiclesDb: db.vehicles
    }
  }));
  return app
};