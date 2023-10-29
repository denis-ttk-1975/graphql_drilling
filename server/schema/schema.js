import graphql from 'graphql';
import { movies, directors } from './data.js';

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLBoolean } = graphql;

import Movies from '../models/movie.js';
import Directors from '../models/director.js';

// console.log('movies: ', movies);
// console.log('directors: ', directors);

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLNonNull(GraphQLString) },
    genre: { type: GraphQLNonNull(GraphQLString) },
    isWatched: { type: GraphQLNonNull(GraphQLBoolean) },
    rate: { type: GraphQLInt },
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
    name: { type: GraphQLNonNull(GraphQLString) },
    age: { type: GraphQLNonNull(GraphQLInt) },
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
      args: { name: { type: GraphQLNonNull(GraphQLString) }, age: { type: GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, args) => {
        const director = new Directors({ name: args.name, age: args.age });
        return director.save();
      },
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
        isWatched: { type: GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        const movie = new Movies({ name: args.name, genre: args.genre, directorId: args.directorId, isWatched: args.isWatched, rate: args.rate });
        return movie.save();
      },
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Movies.findByIdAndRemove(args.id);
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return Directors.findByIdAndRemove(args.id);
      },
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },
        isWatched: { type: GraphQLNonNull(GraphQLBoolean) },
        rate: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return Movies.findByIdAndUpdate(args.id, { $set: { name: args.name, genre: args.genre, directorId: args.directorId, isWatched: args.isWatched, rate: args.rate } }, { new: true });
      },
    },
    updateDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID }, name: { type: GraphQLNonNull(GraphQLString) }, age: { type: GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, args) => {
        return Directors.findByIdAndUpdate(args.id, { $set: { name: args.name, age: args.age } }, { new: true });
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
