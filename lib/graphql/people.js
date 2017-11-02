const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const { getSortQuery } = require('./misc');

const type = module.exports.type = new GraphQLObjectType({
	name: 'people',
	description: 'A character within the Star Wars universe.',
	fields: () => {
		const {type:Films} = require('./films');
		const {type:Planets} = require('./planets');
		const {type:Specie} = require('./species');
		const {type:Starship} = require('./starships');
		const {type:Vehicles} = require('./vehicles');
		return {
			id: {
				type: GraphQLString,
				description: 'identifier',
				resolve: (people) => people._id
			},
			name: {
				type: GraphQLString,
				description: 'The name of this person.'
			},
			birth_year: {
				type: GraphQLString,
				description: 'The birth year of the person, using the in-universe standard of BBY or ABY - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.'
			},
			eye_color: {
				type: GraphQLString,
				description: 'The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.'
			},
			gender: {
				type: GraphQLString,
				description: 'The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.'
			},
			hair_color: {
				type: GraphQLString,
				description: 'The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.'
			},
			height: {
				type: GraphQLString,
				description: 'The height of the person in centimeters.'
			},
			mass: {
				type: GraphQLString,
				description: 'The mass of the person in kilograms.'
			},
			skin_color: {
				type: GraphQLString,
				description: 'The skin color of this person.'
			},
			films: {
				type: new GraphQLList(Films),
				description : 'An array of film resource URLs that this person has been in.',
				resolve: async ({films}, 	arg, {filmsDb}) => films.map(async film => filmsDb.findById(film)),
			},
			homeworld: {
				type: Planets,
				description:'A planet that this person was born on or inhabits.',
				resolve: async ({homeworld}, 	arg, {planetsDb}) => planetsDb.findById(homeworld),
			},
      species: {
        type: new GraphQLNonNull(new GraphQLList(Specie)),
        description: 'List of species that ',
        resolve: async ({species}, args, {speciesDb}) => species.map(async id => speciesDb.findById(id))
			},
			starships: {
        type: new GraphQLList(Starship),
        description: 'Starships piloted by this person',
        resolve: async ({ starships }, args, { starshipsDb }) => starships.map(async id => starshipsDb.findById(id))
			},
      vehicles: {
        type: new GraphQLList(Starship),
        description: 'Vehicles that are drive by this person.',
        resolve: async ({ vehicles }, args, { vehiclesDb }) => vehicles.map(async id => vehiclesDb.findById(id))
      },
		};
	}
});

module.exports.list = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'Characters list',
	args: {
    sort: { type: GraphQLString },
	},
	resolve: (obj, {sort}, {peopleDb}) => {
		const sortQuery = getSortQuery(sort);
		return peopleDb.findAll(sortQuery);
	}
};

module.exports.byName = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'Characters, searched by a name (empty is no characters match)',
	args: {
		name : {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If name="Luke", will return all characters with luke in the name (search is not case senstive)'
		},
	},
	resolve: async (obj, {name}, {peopleDb}) => {
		if (name.length > 2048) {
			throw new Error("Invalid name value");
		}
		return peopleDb.findByName(name);
	}
};
