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

export const updateDirectorMutation = gql`
  mutation updateDirector($id: ID, $name: String!, $age: Int!) {
    updateDirector(id: $id, name: $name, age: $age) {
      id
      name
      age
    }
  }
`;
