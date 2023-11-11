import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query moviesQuery($name: String) {
    moviesAll(name: $name) {
      id
      name
      genre
      isWatched
      rate
      director {
        name
        id
      }
    }
  }
`;
