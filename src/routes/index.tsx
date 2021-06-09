import React from 'react';
import {
  Switch,
  Route,
  Redirect,
  useLocation,
} from 'react-router-dom';
// Components
import Login from 'pages/Login';
import Items from 'pages/Items';
import Accounts from 'pages/Accounts';
import Logs from 'pages/Logs';
import Settings from 'pages/Settings';
import NavBar from 'components/NavBar';

const Router: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/login' ? null : <NavBar />}
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/items" component={Items} />
        <Route exact path="/accounts" component={Accounts} />
        <Route exact path="/logs" component={Logs} />
        <Route exact path="/settings" component={Settings} />
        <Redirect to="/login" />
      </Switch>
    </>
  );
};

export default Router;
