import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import StyledSwitch from 'components/Ui/StyledSwitch';
// Styles
import {
  useStyles,
  TableFooter,
  InputWrapper,
  InputTitle,
} from './styles';
// Icons
import VisibilityIcon from '@material-ui/icons/Visibility';

const AccountsTable: React.FC<any> = ({ rows }) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [show, setShow] = useState(1000);

  const handlerChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlerShowItems = (event: React.ChangeEvent<{ value: unknown }>) => {
    setShow(Number(event.target.value));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell
                align="center"
                style={{ width: '54px', padding: '6px 10px' }}
              >
                №
              </TableCell>
              <TableCell>Комментарий</TableCell>
              <TableCell>Логин</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Logs</TableCell>
              <TableCell align="center">On/Off</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {rows.slice((page - 1) * show,
              (page - 1) * show + show)
              .map((row: any, index: number) => (
                <TableRow key={row.login}>
                  <TableCell align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell>{row.comment || ''}</TableCell>
                  <TableCell>{row.login}</TableCell>
                  <TableCell>
                    { new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'RUB',
                      currencyDisplay: 'narrowSymbol',
                    }).format(row.balance / 100)}{' '}
                    ({ new Intl.NumberFormat('ru-RU', {
                      style: 'currency',
                      currency: 'USD',
                      currencyDisplay: 'narrowSymbol',
                    }).format((row.balance / 100) / 70)})
                  </TableCell>
                  <TableCell align="center">{row.status || 'ok'}</TableCell>
                  <TableCell align="center">
                    <Link to="/logs">
                      <VisibilityIcon />
                    </Link>
                  </TableCell>
                  <TableCell align="center">
                    <StyledSwitch
                      id={row.id}
                      checked={row.enabled}
                    />
                  </TableCell>
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
          count={Math.ceil(rows.length / show)}
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

export default AccountsTable;
