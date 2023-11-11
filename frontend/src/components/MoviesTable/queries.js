import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query moviesQuery {
    moviesAll {
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
