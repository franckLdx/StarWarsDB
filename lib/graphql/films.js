
const {
	GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const type = module.exports.type = new GraphQLObjectType({
  name: 'Film',
  description: `Information about a film`,
  fields: () => {
    const {type:People} = require('./people');
    return {
      title: {
        type: GraphQLString,
          description: `The title of this film`
      },
      episode_id: {
        type: GraphQLInt,
        description: `Episode number`,
      },
      opening_crawl: {
        type: GraphQLString,
        description: `The opening paragraphs at the beginning of this film`
      },
      director: {
        type: GraphQLString,
        description: `The name of the director of this film`
      },
      producers: {
        type: new GraphQLList(GraphQLString),
        description: `The name(s) of the producer(s) of this film.`
      },
      release_date: {
        type: GraphQLString,
        description: `The ISO 8601 date format of film release at original creator country.`
      },
      people: {
			 type: new GraphQLNonNull(new GraphQLList(People)),
			  description: 'An array of characters that are in this film',
			  resolve: async ({characters}, args, {peopleDb}) => characters.map(async id => peopleDb.findById(id))
		  },
    }
  }
});

module.exports.lists = {
  type: new GraphQLNonNull(new GraphQLList(type)),
  resolve: async (obj, args, {filmsDb}) => filmsDb.findAll()
};

module.exports.byEpisodeId = {
  type: type,
  description: 'Return the film with the given id or null it there\'s no film for the episode',
  args: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
  },
  resolve: async (obj, {id}, {filmsDb}) => filmsDb.findByEpisodeId(id)
};

module.exports.byTitle = {
  type: new GraphQLNonNull(new GraphQLList(type)),
  description: 'Returns films which has a given words or expression in is title (empty if no film matchs)',
  args: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'If title="The", will return all films wiht the in the title (search is not case senstive)'
    },
  },
  resolve: async (obj, {title}, {filmsDb}) => {
    if (title.length > 2048) {
      throw new Error("Invalid id value");
    }
    return filmsDb.findByTitle(title);
  }
};