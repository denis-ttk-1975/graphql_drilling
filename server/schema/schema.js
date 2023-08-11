import graphql from 'graphql';
import { movies, directors } from './data.js';

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLFloat } = graphql;

import Movies from '../models/movie.js';
import Directors from '../models/director.js';

// console.log('movies: ', movies);
// console.log('directors: ', directors);

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    directorId: { type: GraphQLID },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        // return directors.find((item) => item.id == parent.directorId);
        return Directors.findById(parent.directorId);
      },
    },
  }),
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies.filter((item) => item.directorId == parent.id);
        return Movies.find({ directorId: parent.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDirector: {
      type: DirectorType,
      args: { name: { type: GraphQLString }, age: { type: GraphQLInt } },
      resolve: (parent, args) => {
        const director = new Directors({ name: args.name, age: args.age });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: { name: { type: GraphQLString }, genre: { type: GraphQLString }, directorId: { type: GraphQLID } },
      resolve: (parent, args) => {
        const movie = new Movies({ name: args.name, genre: args.age, directorId: args.directorId });
        return movie.save();
      },
    },
  },
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return movies.find((item) => item.id == args.id);
        return Movies.findById(args.id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return directors.find((item) => item.id == args.id);
        return Directors.findById(args.id);
      },
    },
    moviesAll: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        // return movies;
        return Movies.find({});
      },
    },
    directorsAll: {
      type: new GraphQLList(DirectorType),
      resolve(parent, args) {
        // return directors;
        return Directors.find({});
      },
    },
  },
});

const schema = new GraphQLSchema({ query: Query, mutation: Mutation });

export default schema;
