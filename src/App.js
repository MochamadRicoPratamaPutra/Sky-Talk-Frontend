import React from 'react';
import Router from './configs/router';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';

const App = () => {
  return (
    <div>
      <ReactNotification />
      <Router />
    </div>
  );
};

export default App;
