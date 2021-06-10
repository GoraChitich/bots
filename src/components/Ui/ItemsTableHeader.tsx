import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
// Components
import CustomDatePicker from './CustomDatePicker';
import {
  makeStyles,
  TextField,
  InputAdornment,
} from '@material-ui/core';
// Icons
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
  searhInput: {
    maxWidth: '40%',
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
    '& .MuiOutlinedInput-adornedStart': {
      paddingLeft: '8px',
    },
    '& .MuiInputAdornment-root': {
      color: 'rgba(0, 123, 255, 1)',
    },
  },
  datePicker: {
    height: '36px',
    '& .react-daterange-picker__wrapper': {
      flexDirection: 'row-reverse',
      background: '#fff',
      borderRadius: '4px',
    },
  },
});

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: rgba(247, 247, 247, 1);
  padding: 10px 15px;
  position: sticky;
  top: 0;
  left: 0;

  z-index: 99;
`;

const ItemsTableHeader: React.FC<any> = ({
  items,
  fetchItems,
  setFilteredItems,
}) => {
  const classes = useStyles();
  const [searchString, setSearchString] = useState<string>('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const clearHandler = () => {
    setDateRange([null, null]);
    fetchItems();
  };

  console.log(items);
  const filterByDate = () => {
    const from = dayjs(startDate || '').unix();
    const to = dayjs(endDate || '').unix();

    setFilteredItems(items.filter((item: any) => {
      if (dayjs(item.createdDate).unix() >= from
        && dayjs(item.createdDate).unix() <= (to + 60 * 60 * 24)) {
        return true;
      }
      return false;
    }));
  };

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchText: string = event.target.value;
    setSearchString(searchText);
    setFilteredItems(
      items.filter(
        (item: any) => (
          item.ruHashName && item.ruHashName.toUpperCase().indexOf(searchText.toUpperCase()) >= 0)
          || (item.hashName && item.hashName.toUpperCase().indexOf(searchText.toUpperCase()) >= 0),
      ),
    );
  };

  return (
    <Wrapper>
      <TextField
        fullWidth
        className={classes.searhInput}
        variant="outlined"
        value={searchString}
        onChange={searchHandler}
        placeholder="engName,ruName"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <CustomDatePicker
        clearHandler={clearHandler}
        dateRange={dateRange}
        setDateRange={setDateRange}
        filter={filterByDate}
      />
    </Wrapper>
  );
};

export default ItemsTableHeader;
