import { gql } from '@apollo/client';

export const addDirectorMutation = gql`
  mutation addDirector($name: String!, $age: Int!) {
    addDirector(name: $name, age: $age) {
      id
      name
      age
    }
  }
`;
