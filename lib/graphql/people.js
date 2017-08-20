const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull
} = require('graphql');

const type = module.exports.type = new GraphQLObjectType({
	name: 'people',
	description: 'A character within the Star Wars universe.',
	fields: () => {
		const {type:Films} = require('./films');
		return {
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
		};
	}
});

module.exports.list = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'Characters list',
	resolve: (obj, args, {peopleDb}) => peopleDb.findAll()
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
