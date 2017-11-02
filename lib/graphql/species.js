const {
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLNonNull,
	GraphQLEnumType
} = require('graphql');

const { getSortQuery } = require('./misc');

const Classification = module.exports.Classification = new GraphQLEnumType({
	name: 'classification',
	description: 'Species\' classification',
	values: {
		AMPHIBIAN: {value: 'amphibian'},
		ARTIFICIAL: {value: 'artificial'},
		GASTROPOD: {value: 'gastropod'},
		INSECTOID: {value: 'insectoid'},
		MAMMAL: {value: 'mammal'},
		REPTILE: {value: 'reptile'},
		REPTILIAN: {value: 'reptilian'},
		SENTIENT: {value: 'sentient'},
		UNKNOWN: {value: 'unknown'},
	}
});

const Designation = module.exports.Designation = new GraphQLEnumType({
	name: 'designation',
	values: {
		REPTILIAN: {value: 'reptilian'},
		SENTIENT: {value: 'sentient'},
	}
});

const type = module.exports.type = new GraphQLObjectType({
	name: 'species',
	description: 'A species within the Star Wars Universe.',
	fields: () => {
    const { type: Film } = require('./films');
    const { type: People } = require('./people');
    const { type: Planet } = require('./planets');
    return {
      id: {
				type: GraphQLString,
				description: 'identifier',
				resolve: (people) => people._id
			},
      name: {
        type: GraphQLString,
        description : 'The name of this species.'
      },
      classification: {
        type: Classification,
        description: 'The classification of this species, such as "mammal" or "reptile".'
      },
      designation: {
        type: Designation,
        description: 'The designation of this species.'
      },
      average_height: {
        type: GraphQLString,
        description: 'The average height of this species in centimeters.'
      },
      average_lifespan: {
        type: GraphQLString,
        description: 'The average lifespan of this species in years.',
      },
      eye_colors: {
        type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        description: 'List of common eye colors for this species, empty if this species does not typically have eyes.',
      },
      hair_colors: {
        type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        description: 'List of common hair colors for this species, empty if this species does not typically have hair (or have no hair at all).',
      },
      skin_colors: {
        type: new GraphQLNonNull(new GraphQLList(GraphQLString)),
        description: 'List of common skin colors for this species, empty if this species does not typically have skin.',
      },
      language: {
        type: GraphQLString,
        description: 'The language commonly spoken by this species.'
      },
      homeworld: {
        type: Planet,
        description: 'A planet that this species originates from.',
        resolve: async ({homeworld}, 	arg, {planetsDb}) => planetsDb.findById(homeworld),
      },
      people: {
        type: new GraphQLList(People),
        description: 'Charactes that are a part of this species.',
        resolve: async ({people}, args, {peopleDb}) => people.map(async id => peopleDb.findById(id))
      },
      films: {
        type: new GraphQLList(Film),
        description: 'Films that this species has appeared in',
        resolve: async ({ films }, args, { filmsDb }) => films.map(async id => filmsDb.findById(id))
      },
    };
  }
});

const list = module.exports.list = {
	type: new GraphQLNonNull(new GraphQLList(type)),
  description: 'species list',
  args: {
    sort: { type: GraphQLString },
  },
	resolve: async (obj, {sort}, {speciesDb}) => {
    const sortQuery = getSortQuery(sort);
    return speciesDb.findAll(sortQuery);
  }
};

const byName = module.exports.byName = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'Species list with a given name (empty is no name matches)',
	args: {
		name : {
			type: new GraphQLNonNull(GraphQLString),
			description: 'If name="Ewok", will return all characters with Ewok in the name (search is not case senstive)'
		},
	},
	resolve: async (obj, {name}, {speciesDb}) => speciesDb.findByName(name)
};

const byClassification = module.exports.byClassification = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'species list of that classification (empty list if found no species)',
	args: {
		classification : {
			type: new GraphQLNonNull(Classification),
			description: 'Classification to search for'
		},
	},
	resolve: async (obj, {classification}, {speciesDb}) => speciesDb.findByClassification(classification)
};

const byDesignation = module.exports.byDesignation = {
	type: new GraphQLNonNull(new GraphQLList(type)),
	description: 'species list of that designation (empty list if found no species)',
	args: {
		designation: {
			type: new GraphQLNonNull(Designation),
			description: 'Designation to search for'
		},
	},
	resolve: async (obj, {designation}, {speciesDb}) => speciesDb.findByDesignation(designation)
};
