import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  table: {
    minWidth: 650,
    color: 'rgba(33, 37, 41, 1)',
    '& .MuiTableCell-root': {
      border: '1px solid rgba(206, 212, 218, 1)',
    },
  },
  tableHead: {
    background: 'rgba(247, 247, 247, 1)',
    fontWeight: 500,
    '& .MuiTableCell-head': {
      padding: '3px',
      fontSize: '12px',
      lineHeight: '20px',
    },
  },
  tableBody: {
    '& .MuiTableCell-root': {
      color: 'rgba(108, 117, 125, 1)',
      lineHeight: '20px',
      padding: '15px 10px',
      fontSize: '12px',
    },
  },
  tableItems: {
    width: '300px',
  },
  itemName: {
    overflow: 'hidden',
    maxWidth: '130px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
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
  linkLeft: {
    // justifyContent: 'left',
    display: 'flex',
  },
});

export const TableCellContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    cursor: pointer;
    width: 15px;

    &:hover {
      opacity: 0.5;
    }
  }
`;

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

export const LinksWrapper = styled.div`
  display: flex;
  justify-content: left;
  color: rgba(0, 123, 255, 1);

  a {
    transition: 0.3s;
  }

  a:hover {
    opacity: 0.5;
  }

  a:first-child {
    margin-right: 5px;
  }
  a:nth-child(2) {
    margin-right: 5px;
  }
`;

export const ItemName = styled.span`
  color: rgba(0, 123, 255, 1);
`;
