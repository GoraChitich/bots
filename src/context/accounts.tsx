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
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/api/getSellerAccounts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setAccounts(data);
    } catch (error) {
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
