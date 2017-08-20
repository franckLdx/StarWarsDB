const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql');

const { list:films, byEpisodeId:filmByEpisodeId, byTitle:filmsByTitle } = require('./films');
const { list:people, byName:peopleByName } = require('./people');
const { list:planets, byName:planetsByName } = require('./planets');

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        async resolve(obj, args, context) {
          return 'world' + Object.keys(context)
        }
      },
      films, filmByEpisodeId, filmsByTitle,
      people, peopleByName,
      planets, planetsByName
    }
  })
});