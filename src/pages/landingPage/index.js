import React from 'react';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';
import Style from './landing.module.css';
const LandingPage = () => {
  const token = localStorage.getItem('token');
  return (
    <div className={`bc-blue ${Style.container}`}>
      <div className={Style.header}>
        <div>
          <img src={Logo} alt="sky" className={Style.logo} />
          <h1 className="fs-29 fw-500 fc-white">SkyTalk</h1>
        </div>
        <div>
          {token ? (
            <>
              <Link to="/chat" className={`fs-22 fw-500 fc-white ${Style.login}`}>
                Chat
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className={`fs-22 fw-500 fc-white ${Style.login}`}>
                Login
              </Link>
              <Link to="/register" className={`fs-22 fw-500 fc-blue ${Style.login} ${Style.register}`}>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
      <h1 className={`fc-white ${Style.big}`}>Enjoy chatting with SkyTalk</h1>
      <h1 className={`fc-white ${Style.big} ${Style.right}`}>
        Connecting people around the <span className={`fc-blue ${Style.block}`}>World</span>
      </h1>
      <Link to={token ? '/chat' : '/login'} className={`fc-blue ${Style.big} ${Style.center}`}>
        <span className={`${Style.blockJoin}`}>{token ? 'Chat now' : 'Join Now!'}</span>
      </Link>
    </div>
  );
};

export default LandingPage;
