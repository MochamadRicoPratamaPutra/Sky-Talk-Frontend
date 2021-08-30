import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from '../../pages/login';
import Register from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import Chat from '../../pages/chat';
import io from 'socket.io-client';
const Router = () => {
  const [socket, setSocket] = useState(null);
  const setupSocket = () => {
    const token = localStorage.getItem('token');
    if (token && !socket) {
      const resultSocket = io('http://localhost:4000', {
        query: {
          token: localStorage.getItem('token'),
        },
      });
      resultSocket.on();
      setSocket(resultSocket);
    }
  };
  useEffect(() => {
    setupSocket();
    // socket.emit('sendMsgToBack', 'hallo my name is risano')
  },);
  useEffect(() => {
    if (socket) {
      socket.on('sendMsgToFront', (data) => {
        alert(data);
      });
    }
  }, [socket]);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} setSocket={setSocket} />} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/chat" render={(props) => <Chat {...props} socket={socket} />} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
