import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
// context
import { AccountsContextProvider } from 'context/accounts';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AccountsContextProvider>
        <App />
      </AccountsContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
