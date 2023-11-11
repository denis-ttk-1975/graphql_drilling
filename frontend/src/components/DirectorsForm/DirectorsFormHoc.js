import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';

import { styles } from './styles';

import { addDirectorMutation, updateDirectorMutation } from './mutations';
import { directorsQuery } from '../DirectorsTable/queries';

const withGraphqlAdd = graphql(addDirectorMutation, {
  props: ({ mutate }) => ({ addDirector: (director) => mutate({ variables: director, refetchQueries: [{ query: directorsQuery, variables: { name: '' } }] }) }),
});

const withGraphqlUpdate = graphql(updateDirectorMutation, {
  props: ({ mutate }) => ({ updateDirector: (director) => mutate({ variables: director, refetchQueries: [{ query: directorsQuery, variables: { name: '' } }] }) }),
});

export default compose(withStyles(styles), withGraphqlAdd, withGraphqlUpdate);
