import styled from 'styled-components';
import { Button } from '@material-ui/core';

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

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    height: 36px;
    background: rgba(0, 123, 255, 1);
    text-transform: none;
  }
`;
