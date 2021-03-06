import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';

export const AccountsContext: any = createContext([]);

export const AccountsContextProvider: React.FC = ({ children }) => {
  const location = useLocation();
  const history = useHistory();
  const [accounts, setAccounts] = useState([]);

  const getSellerAccount = async () => {
    const token = localStorage.getItem('token');

    if (location.pathname === '/login') {
      return;
    }

    if (!token || token === 'null') {
      history.push('/login');
    }

    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/getSellerAccounts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAccounts(data);
    } catch (error) {
      if (error.response.data.statusCode === 401) {
        localStorage.setItem('token', 'null');
        history.push('/login');
      } else {
        console.log(error);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    getSellerAccount();
  }, [location]);

  return (
    <AccountsContext.Provider value={{ accounts, setAccounts }}>
      {children}
    </AccountsContext.Provider>
  );
};
