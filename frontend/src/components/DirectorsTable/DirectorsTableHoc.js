import { withStyles } from '@material-ui/core/styles';
import { compose } from 'recompose';
import { graphql } from '@apollo/client/react/hoc';

import { styles } from './styles';

import { directorsQuery } from './queries';

const withGraphQL = graphql(directorsQuery, {
  options: ({ name = '' }) => ({ variables: { name } }),
});

export default compose(withStyles(styles), withGraphQL);
