import React from 'react';
import Style from '../login/login.module.css';
import LoginCard from '../../component/base/loginCard';
const ForgotPassword = () => {
  return (
    <div className={`bc-bg ${Style.container}`}>
      <LoginCard/>
    </div>
  );
};

export default ForgotPassword;