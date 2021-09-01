import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import Chat from '../../pages/chat';
import io from 'socket.io-client';
import PrivateRoute from './module/privateRoute';
import PublicRoute from './module/publicRoute';
const Router = () => {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem('token');
    if (token && !socket) {
      const resultSocket = io('http://localhost:4000', {
        query: {
          token: token,
        },
      });
      setSocket(resultSocket);
    }
  };
  useEffect(() => {
    setupSocket();
    // socket.emit('sendMsgToBack', 'hallo my name is risano')
  },);
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute exact path="/login" render={(props) => <Login {...props} setSocket={setSocket} />} />
        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/forgot-password" component={ForgotPassword} />
        <PrivateRoute exact path="/chat" render={(props) => <Chat {...props} socket={socket} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
