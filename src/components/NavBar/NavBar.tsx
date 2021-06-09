import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import {
  Nav,
  BrandLogo,
  StyledButton,
} from './styles';
// Icons
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const links = ['Items', 'Accounts', 'Logs', 'Settings'];

const NavBar: React.FC = () => {
  const history = useHistory();

  const logoutHandler = () => {
    localStorage.setItem('token', 'null');
    history.push('/login');
  };

  return (
    <Nav>
      <BrandLogo>
        NavBar
      </BrandLogo>
      {links.map((item: string) => (
        <NavLink key={item} to={`/${item.toLowerCase()}`}>
          {item}
        </NavLink>
      ))}
      <StyledButton
        type="button"
        variant="outlined"
        color="primary"
        onClick={logoutHandler}
      >
        <ExitToAppIcon />
        Logout
      </StyledButton>
    </Nav>
  );
};

export default NavBar;
