import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
    color: 'rgba(33, 37, 41, 1)',
    '& .MuiTableCell-root': {
      border: '1px solid rgba(222, 226, 230, 1)',
    },
  },
  tableHead: {
    background: 'rgba(247, 247, 247, 1)',
    fontWeight: 500,
    fontSize: '0.9rem',
    lineHeight: '20px',
  },
  tableBody: {
    '& .MuiTableCell-root': {
      color: 'rgba(108, 117, 125, 1)',
      lineHeight: '20px',
    },
  },
  pagesInput: {
    width: '50px',
    borderRadius: '4px',
    background: '#fff',
    marginRight: '5px',
    '& .MuiOutlinedInput-input': {
      padding: '5px 10px',
      textAlign: 'center',
    },
    fieldset: {
      height: '29px',
    },
  },
  pagination: {
    '& .MuiPaginationItem-root': {
      backgroundColor: 'rgba(255, 255, 255, 1)',
      width: '28px',
      height: '29px',
      fontSize: '14px',
      lineHeight: '21px',
      color: 'rgba(0, 123, 255, 1)',
    },
    '& .Mui-selected': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    },
    '& .MuiPaginationItem-ellipsis': {
      background: 'transparent',
      color: '#fff',
    },
  },
  itemsSelect: {
    minWidth: '75px',
    marginLeft: '5px',
    borderRadius: '4px',
    background: '#fff',
    '& .MuiOutlinedInput-input': {
      padding: '5px 30px 5px 10px',
    },
  },
});

export const TableFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 100px;
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const InputTitle = styled.span`
  color: #fff;
  font-size: 0.9rem;
  line-height: 24px;
`;
