import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  textField: {
    maxWidth: '40%',
    borderRadius: '4px',
    background: '#fff',
    marginLeft: '5px',
    height: '36px',
    marginRight: '50px',
    '& fieldset': {
      height: '42px',
    },
    '& .MuiInputBase-input': {
      boxSizing: 'border-box',
    },
  },
  textFieldSmall: {
    width: '50px',
    borderRadius: '4px',
    background: '#fff',
    marginLeft: '5px',
    height: '36px',
    marginRight: '20px',
    '& fieldset': {
      height: '42px',
    },
    '& .MuiInputBase-input': {
      boxSizing: 'border-box',
    },
  },
  button: {
    background: 'rgba(0, 123, 255, 1)',
    textTransform: 'none',
    height: '36p',
    minWidth: '105px',
  },
  sec: {
    width: '20px',
    minWidth: '45px',
  },
});

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: #fff;
  margin-bottom: 20px;
`;

export const HeaderTitle = styled.h2`
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 34px;
`;

export const Content = styled.div`
  background: #fff;
  border-radius: 4px;
  padding: 20px;
`;

export const ProfitWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

export const Label = styled.label`
  display: block;
  margin-right: 5px;
  min-width: 130px;
`;

export const ApiWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;
