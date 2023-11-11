import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

import withHocs from './DirectorsSearchHoc';

class DirectorsSearch extends React.Component {
  render() {
    const { classes, name, handleChange, handleSearch } = this.props;

    return (
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          value={name}
          onChange={handleChange('name')}
          onKeyPress={(e) => handleSearch(e)}
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
        />
      </div>
    );
  }
}

export default withHocs(DirectorsSearch);
