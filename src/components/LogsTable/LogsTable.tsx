import React, { useState } from 'react';
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
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// Styles
import {
  useStyles,
  TableFooter,
  InputWrapper,
  InputTitle,
} from './styles';

function createData(
  number: number,
  bot: string,
  type: string,
  logTime: string,
  request: string,
  response: string,
) {
  return {
    number,
    bot,
    type,
    logTime,
    request,
    response,
  };
}

const rows = [
  createData(1, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', 'Error', 'Error'),
  createData(2, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(3, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(4, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(5, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(6, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(7, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(8, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(9, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(10, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(11, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(12, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(13, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(14, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(15, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(16, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(17, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(18, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(19, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(20, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(21, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
  createData(22, 'lu83vxc73b5z639', 'Steam', '25/11 19:58:21', '', ''),
];

const LogsTable: React.FC = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [show, setShow] = useState(1000);
  const [tabValue, setTabValue] = useState(0);

  const handleChangeTab = (event: React.ChangeEvent<unknown>, newValue: number) => {
    setTabValue(newValue);
  };

  const handlerChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handlerShowItems = (event: React.ChangeEvent<{ value: unknown }>) => {
    setShow(Number(event.target.value));
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Tabs
          className={classes.tabs}
          variant="fullWidth"
          value={tabValue}
          indicatorColor="primary"
          onChange={handleChangeTab}
          aria-label="value tabs"
        >
          <Tab label="All types" />
          <Tab label="Steam" />
          <Tab label="Proxy" />
          <Tab label="Other" />
        </Tabs>
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell
                align="center"
                style={{ width: '54px', padding: '6px 10px' }}
              >
                №
              </TableCell>
              <TableCell>Bot</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Log time</TableCell>
              <TableCell>Request</TableCell>
              <TableCell>Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className={classes.tableBody}>
            {rows.slice((page - 1) * rowsPerPage,
              (page - 1) * rowsPerPage + rowsPerPage)
              .map((row) => (
                <TableRow key={row.number}>
                  <TableCell align="center">
                    {row.number}
                  </TableCell>
                  <TableCell>{row.bot}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                    {row.logTime}
                  </TableCell>
                  <TableCell style={{ color: 'rgba(252, 124, 95, 1)' }}>{row.request}</TableCell>
                  <TableCell style={{ color: 'rgba(252, 124, 95, 1)' }}>{row.response}</TableCell>
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
          count={Math.ceil(rows.length / rowsPerPage)}
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

export default LogsTable;
