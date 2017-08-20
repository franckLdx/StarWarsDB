const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull
} = require('graphql');

const type = module.exports.type = new GraphQLObjectType({
  name: 'Planet',
  description: `Information about a planet`,
  fields: () => {
    const { type: Film } = require('./films');
    const { type: People } = require('./people');
    return {
      name: {
        type: GraphQLString,
        description: 'The name of this planet.',
      },
      diameter: {
        type: GraphQLString,
        description: 'The diameter of this planet in kilometers.',
      },
      rotation_period: {
        type: GraphQLString,
        description: 'The number of standard hours it takes for this planet to complete a single rotation on its axis.'
      },
      orbital_period: {
        type: GraphQLString,
        description: 'The number of standard days it takes for this planet to complete a single orbit of its local star.'
      },
      gravity: {
        type: GraphQLString,
        description: 'A number denoting the gravity of this planet, where "1" is normal or 1 standard G. "2" is twice or 2 standard Gs. "0.5" is half or 0.5 standard Gs.'
      },
      population: {
        type: GraphQLString,
        description: 'The average population of sentient beings inhabiting this planet.'
      },
      climate: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The climate(s) of this planet.'
      },
      terrain: {
        type: new GraphQLNonNull(GraphQLString),
        description: 'The terrain(s) of this planet.'
      },
      surface_water: {
        type: GraphQLString,
        description: 'The percentage of the planet surface that is naturally occuring water or bodies of water.'
      },
      residents: {
        type: new GraphQLNonNull(new GraphQLList(People)),
        description: 'Characters that live on this planet (empty if no redident are known).',
        resolve: async ({ residents }, args, { peopleDb }) => residents.map(async id => peopleDb.findById(id))
      },
      films: {
        type: new GraphQLNonNull(new GraphQLList(Film)),
        description: 'Films that this planet has appeared in.',
        resolve: async ({ films }, args, { filmsDb }) => films.map(async id => filmsDb.findById(id))
      }
    };
  }
});

module.exports.list = {
  type: new GraphQLNonNull(new GraphQLList(type)),
  description: 'Planets list',
  resolve: async (obj, args, {planetsDb}) => planetsDb.findAll()
};

module.exports.byName = {
  type: new GraphQLNonNull(new GraphQLList(type)),
  description: 'List of the planet whith has a name that contains the given name (empty if no match, search is not case sensitive)',
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'a full or partial planet name'
    }
  },
  resolve: async (obj, {name}, {planetsDb}) => {
    if (name.length > 2048) {
      throw new Error("Invalid name value");
    }
    return planetsDb.findByName(name);
  }
};
