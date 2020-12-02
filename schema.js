const { GraphQLString, GraphQLObjectType, GraphQLSchema } = require("graphql");
const _ = require('lodash')

const books = [
  { name: "Children of Blood and Bone", genre: "Fantasy", id: "1" },
  { name: "The Final Empire", genre: "Adventure", id: "2" },
  { name: "The Giver", genre: "Sci-Fi", id: "3" },
];

// BookType
const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
});

// RootQuery
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return _.find(books, {id: args.id})
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
