import { gql } from '@apollo/client';

export const directorsQuery = gql`
  query directorsQuery($name: String) {
    directorsAll(name: $name) {
      id
      name
    }
  }
`;
