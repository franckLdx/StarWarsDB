const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const { getSortQuery } = require('./misc');

const type = module.exports.type = new GraphQLObjectType({
	name: 'starships',
	description: 'A starship within the Star Wars Universe.',
	fields: () => {
    const { type: Film } = require('./films');
    const { type: People } = require('./people');
    return {
      id: {
				type: GraphQLString,
				description: 'identifier',
				resolve: (people) => people._id
			},
      name: {
        type: GraphQLString,
        description: 'The name of this starship. The common name, such as "Death Star".'
      },
      model: {
        type: GraphQLString,
        description:'The model or official name of this starship. Such as "T-65 X-wing" or "DS-1 Orbital Battle Station".'
      },
      starship_class: {
        type: GraphQLString,
        description:'The class of this starship, such as "Starfighter" or "Deep Space Mobile Battlestation."'
      },
      manufacturer: {
        type: GraphQLString,
        description:'The manufacturer of this starship. Comma seperated if more than one.'
      },
      cost_in_credits: {
        type: GraphQLString,
        description:'The cost of this starship new, in galactic credits.'
      },
      length: {
        type: GraphQLString,
        description:'The length of this starship in meters.'
      },
      crew: {
        type: GraphQLString,
        description:'The number of personnel needed to run or pilot this starship.'
      },
      passengers: {
        type: GraphQLString,
        description:'The number of non-essential people this starship can transport.'
      },
      max_atmosphering_speed: {
        type: GraphQLString,
        description:'The maximum speed of this starship in atmosphere. "N/A" if this starship is incapable of atmosphering flight.'
      },
      hyperdrive_rating: {
        type: GraphQLString,
        description:'The class of this starships hyperdrive.'
      },
      MGLT: {
        type: GraphQLString,
        description:'The Maximum number of Megalights this starship can travel in a standard hour. A "Megalight" is a standard unit of distance and has never been defined before within the Star Wars universe. This figure is only really useful for measuring the difference in speed of starships. We can assume it is similar to AU, the distance between our Sun (Sol) and Earth.'
      },
      cargo_capacity: {
        type: GraphQLString,
        description:'The maximum number of kilograms that this starship can transport.'
      },
      consumables: {
        type: GraphQLString,
        description:'The maximum length of time that this starship can provide consumables for its entire crew without having to resupply.'
      },
      pilots: {
        type: new GraphQLList(People),
        description: 'List of pilots that has piloted this ship.',
        resolve: async ({pilots}, args, {peopleDb}) => pilots.map(async id => peopleDb.findById(id))
      },
      films: {
        type: new GraphQLList(Film),
        description: 'Films that this ships has appeared in',
        resolve: async ({ films }, args, { filmsDb }) => films.map(async id => filmsDb.findById(id))
      }
    };
  }
});

module.exports.list = {
	type: new GraphQLNonNull(new GraphQLList(type)),
  description: 'Starships list',
  args: {
    sort: { type: GraphQLString },
  },
	resolve: async (obj, {sort}, {starshipsDb}) => {
    const sortQuery = getSortQuery(sort);
    return starshipsDb.findAll(sortQuery);
  }
};

module.exports.byName = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'List of the starships whith has a name that contains the given name (empty if no match, search is not case sensitive)',
	args: {
		name : {
			type: new GraphQLNonNull(GraphQLString),
			description: 'a full or partial starship name'
		}
	},
	resolve: async (obj, {name}, {starshipsDb}) => starshipsDb.findByName(name)
};