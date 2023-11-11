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
      resolve({ directorId }, args) {
        // return directors.find((item) => item.id == parent.directorId);
        return Directors.findById(directorId);
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
      resolve({ id }, args) {
        // return movies.filter((item) => item.directorId == parent.id);
        return Movies.find({ directorId: id });
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
      resolve: (parent, { name, age }) => {
        const director = new Directors({ name, age });
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
      resolve: (parent, { name, genre, directorId, isWatched, rate }) => {
        const movie = new Movies({ name, genre, directorId, isWatched, rate });
        return movie.save();
      },
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => {
        return Movies.findByIdAndRemove(id);
      },
    },
    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, { id }) => {
        return Directors.findByIdAndRemove(id);
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
      resolve: (parent, { id, name, genre, directorId, isWatched, rate }) => {
        return Movies.findByIdAndUpdate(id, { $set: { name, genre, directorId, isWatched, rate } }, { new: true });
      },
    },
    updateDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID }, name: { type: GraphQLNonNull(GraphQLString) }, age: { type: GraphQLNonNull(GraphQLInt) } },
      resolve: (parent, { id, name, age }) => {
        return Directors.findByIdAndUpdate(id, { $set: { name, age } }, { new: true });
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
      resolve(parent, { id }) {
        // return movies.find((item) => item.id == args.id);
        return Movies.findById(id);
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, { id }) {
        // return directors.find((item) => item.id == args.id);
        return Directors.findById(id);
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
