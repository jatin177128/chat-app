// src/App.tsx
import React from 'react';
import { CssBaseline, GlobalStyles } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import Chat from './components/Chat';

const globalStyles = {
  body: {
    backgroundColor: '#f0f2f5',
    margin: 0,
    padding: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <Chat />
    </Provider>
  );
};

export default App;