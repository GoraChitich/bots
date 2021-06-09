import styled from 'styled-components';
import { TextField, Button } from '@material-ui/core';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;

  width: 340px;
  min-height: 370px;
  background: #FFFFFF;

  border: 1px solid #CED4DA;
  border-radius: 4px;
  color: rgba(33, 37, 41, 1);
`;

export const FormLabel = styled.h1`
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 24px;

  padding: 20px;
  text-align: center;
  border-bottom: 1px solid rgba(222, 226, 230, 1);
`;

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  
  font-weight: 400;
  font-size: 1rem;
  line-height: 24px;

  &:first-of-type {
    margin: 16px 0 24px 0;
  }

  &:nth-of-type(2) {
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(222, 226, 230, 1);
  }
`;

export const Title = styled.span`
  margin-bottom: 8px;
`;

export const StyledTextField = styled(TextField)`
  
  & .MuiOutlinedInput-input {
    padding: 12px 14px;
  }

  fieldset {
    height: 46px;
  }
`;

export const StyledButton = styled(Button)`

  &.MuiButton-root {
    margin: 16px;
    border-radius: 5px;
    background: rgba(0, 123, 255, 1);
    height: 46px;

    text-transform: none;
    font-size: 20px;
    line-height: 30px;
  }
`;
