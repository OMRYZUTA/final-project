import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 460,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function SearchField({ handleSearchChanged, disabled }) {
  const classes = useStyles();
  const handleChange = (e) => {
    handleSearchChanged(e)
  }
  return (
    <div component="form" className={classes.root} disabled={disabled}>

      <InputBase
        onChange={handleChange}
        className={classes.input}
        placeholder="search for job, company, reference..."
        inputProps={{ 'aria-label': 'search google maps' }}
        disabled={disabled}
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search" disabled={disabled}>
        <SearchIcon />
      </IconButton>

    </div>
  );
}
