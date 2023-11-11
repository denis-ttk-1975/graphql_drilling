import { gql } from '@apollo/client';

export const addMovieMutation = gql`
  mutation addMovieMutation($name: String!, $genre: String!, $isWatched: Boolean!, $rate: Int, $directorId: ID) {
    addMovie(name: $name, genre: $genre, isWatched: $isWatched, rate: $rate, directorId: $directorId) {
      id
      name
      genre
      isWatched
      rate
    }
  }
`;

export const updateMovieMutation = gql`
  mutation updateMovieMutation($id: ID, $name: String!, $genre: String!, $isWatched: Boolean!, $rate: Int, $directorId: ID) {
    updateMovie(id: $id, name: $name, genre: $genre, isWatched: $isWatched, rate: $rate, directorId: $directorId) {
      id
      name
      genre
      isWatched
      rate
    }
  }
`;
