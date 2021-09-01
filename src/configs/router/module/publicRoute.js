import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PublicRoute = ({ component: Component, render: Render = null, ...rest }) => {
  const isAuth = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? <Redirect to="/chat" /> : Render ? Render(props) : Component ? <Component {...props} /> : null
      }}
    />
  );
};

export default PublicRoute;
