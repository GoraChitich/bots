import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
// Components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import ItemsTableHeader from 'components/Ui/ItemsTableHeader';
import Filters from 'components/Ui/Filters';
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
// Styles
import {
  useStyles,
  TableFooter,
  InputWrapper,
  InputTitle,
  LinksWrapper,
  ItemName,
  TableCellContentWrapper,
} from './styles';

const ItemsTable: React.FC<any> = ({
  items,
  filteredItems,
  getItems,
  setFilteredItems,
}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [show, setShow] = useState(100);

  const handlerChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlerShowItems = (event: React.ChangeEvent<{ value: unknown }>) => {
    setShow(Number(event.target.value));
    getItems();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <ItemsTableHeader
          items={items}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          fetchItems={getItems}
        />
        <Filters
          items={items}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          fetchItems={getItems}
        />
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell
                align="center"
                style={{ width: '54px', padding: '6px 10px' }}
              >
                №
              </TableCell>
              <TableCell align="center">Bot</TableCell>
              <TableCell align="center">Items</TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  G.Price
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  C.Date
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  OfferedP
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  OfferedP.T
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  Steam.P
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  S.time
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  Min.profit
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  Min.time
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  Max.profit
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  Max.time
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  Hold off
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Place</TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  AssedId
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">
                <TableCellContentWrapper>
                  D.discount
                  <UnfoldMoreIcon />
                </TableCellContentWrapper>
              </TableCell>
              <TableCell align="center">U.Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {filteredItems.slice((page - 1) * show,
              (page - 1) * show + show)
              .map((row: any, index: number) => (
                <TableRow key={row.assetId}>
                  <TableCell align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {row.accountSeller || ''}
                  </TableCell>
                  <TableCell className={classes.itemName} align="center">
                    <LinksWrapper>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://market.csgo.com/?s=price&r=&q=&search=${row.hashName}`}
                      >
                        EN
                      </a>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://market.csgo.com/?s=price&r=&q=&search=${row.hashName}`}
                      >
                        RU
                      </a>
                    </LinksWrapper>
                    <Tooltip title={row.hashName}>
                      <ItemName>
                        {row.hashName}
                      </ItemName>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center">
                    { new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      currencyDisplay: 'narrowSymbol',
                    }).format(Number(row.googlePrice))}{' '}
                    ({ new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'USD',
                      currencyDisplay: 'narrowSymbol',
                    }).format(Number(row.googlePrice) / 70)})
                  </TableCell>
                  <TableCell align="center">
                    {dayjs(row.createdDate).format('DD MMM HH:mm')}
                  </TableCell>
                  <TableCell align="center">
                    { new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      currencyDisplay: 'narrowSymbol',
                    }).format(Number(row.offeredPrice))}{' '}
                    ({ new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'USD',
                      currencyDisplay: 'narrowSymbol',
                    }).format(Number(row.offeredPrice) / 70)})
                  </TableCell>
                  <TableCell align="center">OfferedP.T</TableCell>
                  <TableCell align="center">
                    { new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      currencyDisplay: 'narrowSymbol',
                    }).format(Number(row.steamPrice))}{' '}
                    ({ new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'USD',
                      currencyDisplay: 'narrowSymbol',
                    }).format(Number(row.steamPrice) / 70)})
                  </TableCell>
                  <TableCell align="center">S.time</TableCell>
                  <TableCell align="center">
                    {row.minProfit}
                  </TableCell>
                  <TableCell align="center">Min.time</TableCell>
                  <TableCell align="center">
                    {row.maxProfit}
                  </TableCell>
                  <TableCell align="center">Max.time</TableCell>
                  <TableCell align="center">
                    none
                  </TableCell>
                  <TableCell align="center">
                    {row.status}
                  </TableCell>
                  <TableCell align="center">Place</TableCell>
                  <TableCell align="center">
                    {row.assetId}
                  </TableCell>
                  <TableCell align="center">D.discount</TableCell>
                  <TableCell align="center">none</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableFooter>
        <InputWrapper>
          <TextField
            id="outlined-secondary"
            variant="outlined"
            type="tel"
            className={classes.pagesInput}
            value={page}
          />
          <InputTitle>
            страница.
          </InputTitle>
        </InputWrapper>
        <Pagination
          className={classes.pagination}
          count={Math.ceil(items.length / show)}
          page={page}
          defaultPage={1}
          variant="outlined"
          shape="rounded"
          onChange={handlerChangePage}
        />
        <InputWrapper>
          <InputTitle>
            Выводить по:
          </InputTitle>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={show}
            onChange={handlerShowItems}
            variant="outlined"
            className={classes.itemsSelect}
          >
            <MenuItem value={1000}>1000</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={5000}>5000</MenuItem>
          </Select>
        </InputWrapper>
      </TableFooter>
    </>
  );
};

export default ItemsTable;