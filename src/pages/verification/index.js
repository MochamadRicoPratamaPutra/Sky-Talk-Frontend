import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import Style from './confirmation.module.css';
import { useParams, useHistory } from 'react-router';

const ConfirmationStatus = () => {
  const { id } = useParams();
  const history = useHistory();
  const [validate, setValidate] = useState(false);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users/verification/${id}`)
      .then((res) => {
        setValidate(true);
        setTimeout(() => {
          history.push('/login');
        }, 7000);
      })
      .catch((err) => {
        setTimeout(() => {
          history.push('/');
        }, 7000);
      });
  });
  console.log(validate);
  return (
    <div>
      {validate ? (
        <div className={Style.wrapper}>
          <img src={Logo} alt="Logo" className={Style.logoSky}/>
          <h1>Thank you for registering</h1>
          <h2>Enjoy your chat with people around the world!</h2>
        </div>
      ) : (
        <div className={Style.wrapper}>
          <img src={Logo} alt="Logo" className={Style.logoSky}/>
          <h1>FORBIDDEN, YOU DONT HAVE ACCESS TO THIS PAGE</h1>
        </div>
      )}
    </div>
  );
};

export default ConfirmationStatus;
