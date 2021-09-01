import React from 'react';
import { Route, Redirect } from 'react-router-dom';
const PrivateRoute = ({ component: Component, render: Render = null, ...rest }) => {
  const isAuth = localStorage.getItem('token');
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? Render ? Render(props) : Component ? <Component {...props} /> : <Redirect to="/login" /> : <Redirect to="/login" />;
      }}
    />
  );
};
export default PrivateRoute;
