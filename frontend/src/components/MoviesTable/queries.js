import { gql } from '@apollo/client';

export const moviesQuery = gql`
  query moviesAll {
    moviesAll {
      id
      name
      genre
    }
  }
`;
