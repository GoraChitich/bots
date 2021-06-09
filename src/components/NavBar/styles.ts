import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  background: rgba(248, 249, 250, 1);
  height: 56px;
  padding: 0 16px;

  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  z-index: 999;

  a, a:visited {
    rgba(0, 123, 255, 1);
    text-decoration: none;

    color: rgba(0, 123, 255, 1);
    margin-right: 32px;
    transition: all 0.3s;

    &:last-child {
      margin-right: 0;
    }
  }

  a:hover {
    opacity: 0.6;
  }

  a.active {
    color: rgba(108, 117, 125, 1);
  }
`;

export const BrandLogo = styled.div`
  color: rgba(33, 37, 41, 1);

  margin-right: 36px;
  font-weight: 500;
  font-size: 1.3rem;
  line-height: 24px;
`;

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    height: 36px;
    margin-left: auto;
    color: rgba(0, 123, 255, 1);
    text-transform: none;

    svg {
      margin-right: 12px;
    }
  }

  &.MuiButton-outlinedPrimary {
    border: 1px solid rgba(0, 123, 255, 1);
  }
  
`;
