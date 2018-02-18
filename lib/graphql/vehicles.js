const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const { getSortQuery } = require('./misc');

const type = module.exports.type = new GraphQLObjectType({
	name: 'vehicles',
	description: 'A vehicle within the Star Wars universe.',
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
				description: 'The name of this vehicle. The common name, such as "Sand Crawler" or "Speeder bike".'
			},
			model : {
				type: GraphQLString,
				description: 'The model or official name of this vehicle. Such as "All-Terrain Attack Transport."'
			},
			vehicle_class: {
				type: GraphQLString,
				description: 'The class of this vehicle, such as "Wheeled" or "Repulsorcraft."'
			},
			manufacturer: {
				type: GraphQLString,
				description: 'The manufacturer of this vehicle. Comma-seperated if more than one.'
			},
			length: {
				type: GraphQLString,
				description: 'The length of this vehicle in meters.'
			},
			cost_in_credits: {
				type: GraphQLString,
				description: 'The cost of this vehicle new, in Galactic Credits.'
			},
			crew: {
				type: GraphQLString,
				description: 'The number of personnel needed to run or pilot this vehicle.'
			},
			passengers: {
				type: GraphQLString,
				description: 'The number of non-essential people this vehicle can transport.'
			},
			max_atmosphering_speed: {
				type: GraphQLString,
				description: 'The maximum speed of this vehicle in atmosphere.'
			},
			cargo_capacity: {
				type: GraphQLString,
				description: 'The maximum number of kilograms that this vehicle can transport.'
			},
			consumables: {
				type: GraphQLString,
				description: 'The maximum number of kilograms that this vehicle can transport.'
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
	description: 'Vehicles list',
	args: {
    sort: { type: GraphQLString },
  },
	resolve: async (obj, {sort}, {vehiclesDb}) => {
		const sortQuery = getSortQuery(sort);
		return vehiclesDb.findAll(sortQuery);
	}
};

module.exports.byName = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'Vehicles, searched by a name (empty is no vehicles match)',
	args: {
		name : {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If name="speeder", will return all vehicles with speeder in the name (search is not case senstive)'
		},
	},
	resolve: async (obj, {name}, {vehiclesDb}) => vehiclesDb.findByName(name)
};
