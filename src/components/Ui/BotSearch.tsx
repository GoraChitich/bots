import React from 'react';
import { makeStyles, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles({
  textField: {
    width: '280px',
    borderRadius: '4px',
    background: '#fff',
    marginLeft: '5px',
    height: '36px',
    '& fieldset': {
      height: '42px',
    },
    '& .MuiInputBase-input': {
      boxSizing: 'border-box',
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: 'rgba(252, 124, 95, 1)',
    },
    '& .MuiAutocomplete-popupIndicator': {
      display: 'none',
    },
  },
});

const BotSearch: React.FC<any> = ({
  options,
  items,
  setItems,
  setFilteredItems,
  getItems,
}) => {
  const classes = useStyles();

  const filterBotHandler = (event: any, value: any) => {
    if (value === null) {
      getItems();
    } else {
      setItems(items.filter((item: any) => item.accountSeller === value.title));
      setFilteredItems(items.filter((item: any) => item.accountSeller === value.title));
    }
  };

  return (
    <Autocomplete
      id="bot-search"
      options={options}
      getOptionLabel={(option: any) => option.title}
      onChange={filterBotHandler}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.textField}
          variant="outlined"
        />
      )}
    />
  );
};

export default BotSearch;
