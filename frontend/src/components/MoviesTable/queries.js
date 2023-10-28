import { gql } from 'apollo-boost';

export const moviesQuery = gql`
  query moviesAll {
    movies {
      id
      name
      genre
    }
  }
`;
