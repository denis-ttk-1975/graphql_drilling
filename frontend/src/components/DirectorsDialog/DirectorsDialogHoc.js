import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';

import { deleteDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphqlDelete = graphql(deleteDirectorMutation, {
  props: ({ mutate }) => ({ deleteDirector: (id) => mutate({ variables: id, refetchQueries: [{ query: directorsQuery }] }) }),
});

export default compose(withGraphqlDelete);
