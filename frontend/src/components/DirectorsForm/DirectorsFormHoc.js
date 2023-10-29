import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';

import { styles } from './styles';

import { addDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphqlAdd = graphql(addDirectorMutation, {
  props: ({ mutate }) => ({ addDirector: (director) => mutate({ variables: director, refetchQueries: [{ query: directorsQuery }] }) }),
});

export default compose(withStyles(styles), withGraphqlAdd);
