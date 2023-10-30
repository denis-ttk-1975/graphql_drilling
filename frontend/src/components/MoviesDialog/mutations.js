import { gql } from '@apollo/client';

export const deleteMovieMutation = gql`
  mutation deleteMovieMutation($id: ID) {
    deleteMovie(id: $id) {
      id
      name
      genre
    }
  }
`;
