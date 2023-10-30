import { gql } from '@apollo/client';

export const deleteDirectorMutation = gql`
  mutation deleteDirectorMutation($id: ID) {
    deleteDirector(id: $id) {
      id
      name
      age
    }
  }
`;
