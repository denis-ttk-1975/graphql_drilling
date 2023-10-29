import { gql } from '@apollo/client';

export const directorsQuery = gql`
  query directorsQuery {
    directorsAll {
      id
      name
      age
      movies {
        name
        id
      }
    }
  }
`;
