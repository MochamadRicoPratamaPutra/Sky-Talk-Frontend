import React from 'react';
import Style from './login.module.css';
import LoginCard from '../../component/base/loginCard';
const Login = (props) => {
  return (
    <div className={`bc-bg ${Style.container}`}>
      <LoginCard {...props} type="login" />
    </div>
  );
};

export default Login;
