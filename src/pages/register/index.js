import React from 'react';
import Style from '../login/login.module.css';
import LoginCard from '../../component/base/loginCard';
const Register = () => {
  return (
    <div className={`bc-bg ${Style.container}`}>
      <LoginCard type='register'/>
    </div>
  );
};

export default Register;