import React from 'react';
// Global styles and reset
import { GlobalStyle } from 'styles/globalStyles';
// Routes
import Router from './routes';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router />
  </>
);

export default App;
