import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Style from './loginCard.module.css';
import { useHistory } from 'react-router';
// import axios from 'axios';
import swal from 'sweetalert';
import io from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { login, signup, renewPass } from '../../../configs/redux/Action/userAction';
const LoginCard = ({ type, setSocket, ...props }) => {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [formRegister, setFormRegister] = useState({
    name: '',
    email: '',
    password: '',
    role: 'users',
  });
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChangeRegister = (e) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const handleSubmit = (goto, data) => {
    if (goto === 'login') {
      dispatch(login(data))
        .then(() => {
          swal('Sucess', 'Welcome to SkyTalk', 'success');
          const resultSocket = io(`${process.env.REACT_APP_BASE_URL}`, {
            query: {
              token: localStorage.getItem('token'),
            },
          });
          setSocket(resultSocket);
          history.push('/chat');
        })
        .catch((err) => {
          swal('Error', `${err}`, 'error');
        });
    } else if (goto === 'register') {
      dispatch(signup(data))
        .then(() => {
          swal('Sucess', 'Check your email for activating your account', 'success');
        })
        .catch((err) => {
          swal('Error Register', `${err}`, 'error');
        });
    } else {
      dispatch(renewPass(data))
        .then(() => {
          swal('Sucess', 'Check your email for confirmation', 'success');
        })
        .catch((err) => {
          swal('Error', `${err}`, 'error');
        });
    }
    // axios
    //   .post(`${process.env.REACT_APP_BASE_URL}/users/${goto}`, data)
    //   .then((res) => {
    //     if (goto === 'register') {
    //       swal('Sucess', 'Check your email for activating your account', 'success');
    //     } else if (goto === 'login') {
    //       swal('Sucess', 'Welcome to SkyTalk', 'success');
    //       console.log(res);
    //       localStorage.setItem('token', res.data.data.token);
    //       const resultSocket = io(`${process.env.REACT_APP_BASE_URL}`);
    //       props.setSocket(resultSocket);
    //       history.push('/chat');
    //     } else {
    //       swal('Sucess', 'Check your email for confirmation of your forgot password', 'success');
    //     }
    //   })
    //   .catch((err) => {
    //     swal('Error', `${err}`, 'error');
    //   });
  };
  const history = useHistory();
  return (
    <div>
      {type === 'login' ? (
        <>
          <div className={`bc-white ${Style.box}`}>
            <p className={`fs-22 fw-500 fc-blue ${Style.title}`}>Login</p>
            <p className="fs-14 fw-400 fc-black">Hi, Welcome Back!</p>
            <form>
              <label htmlFor="email" className="fs-14 fw-400 fc-grey">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Input your email"
                className="fs-16 fw-500 fc-black"
                onChange={handleChange}
              />
              <label htmlFor="password" className="fs-14 fw-400 fc-grey">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Input your password"
                className="fs-16 fw-500 fc-black"
                onChange={handleChange}
              />
            </form>
            <Link to="/forgot-password" className={`fs-16 fw-400 fc-blue ${Style.forgot}`}>
              Forgot your password?
            </Link>
            <button
              className={`fs-16 fw-500 fc-white bc-blue ${Style.button}`}
              onClick={() => handleSubmit('login', form)}
            >
              Login
            </button>
            <div>
              <hr className={Style.hr} />
              <p className="fs-16 fw-400 fc-grey">Login with</p>
              <hr className={Style.hr} />
            </div>
            <button className={`fs-16 fw-500 fc-blue bc-white ${Style.button} ${Style.google}`}>Google</button>
            <p className="fs-14 fw-500 fc-black">
              Don't have an account?{' '}
              <span className="fc-blue">
                <Link to="/register" className="fc-blue">
                  Sign Up
                </Link>
              </span>
            </p>
          </div>
        </>
      ) : type === 'register' ? (
        <>
          <div className={`bc-white ${Style.box}`}>
            <div className={Style.titleBox}>
              <button className={`fs-22 fw-500 fc-blue ${Style.back}`} onClick={() => history.goBack()}>{`<`}</button>
              <p className={`fs-22 fw-500 fc-blue ${Style.title}`}>Register</p>
            </div>
            <p className="fs-14 fw-400 fc-black">Let’s create your account!</p>
            <label htmlFor="name" className="fs-14 fw-400 fc-grey">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Input your name"
              className="fs-16 fw-500 fc-black"
              onChange={handleChangeRegister}
            />
            <label htmlFor="email" className="fs-14 fw-400 fc-grey">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Input your email"
              className="fs-16 fw-500 fc-black"
              onChange={handleChangeRegister}
            />
            <label htmlFor="password" className="fs-14 fw-400 fc-grey">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Input your password"
              className="fs-16 fw-500 fc-black"
              onChange={handleChangeRegister}
              min={6}
              max={12}
            />
            <button
              className={`fs-16 fw-500 fc-white bc-blue ${Style.button}`}
              onClick={() => handleSubmit('register', formRegister)}
            >
              Register
            </button>
            <div>
              <hr className={Style.hr} />
              <p className="fs-16 fw-400 fc-grey">Register with</p>
              <hr className={Style.hr} />
            </div>
            <button className={`fs-16 fw-500 fc-blue bc-white ${Style.button} ${Style.google}`}>Google</button>
          </div>
        </>
      ) : (
        <>
          <div className={`bc-white ${Style.boxForgot}`}>
            <div className={Style.titleBox}>
              <button className={`fs-22 fw-500 fc-blue ${Style.back}`} onClick={() => history.goBack()}>{`<`}</button>
              <p className={`fs-22 fw-500 fc-blue ${Style.title}`}>Forgot Password</p>
            </div>
            <p className={`"fs-14 fw-400 fc-black" ${Style.description}`}>You’ll get messages soon on your e-mail </p>
            <form>
              <label htmlFor="email" className="fs-14 fw-400 fc-grey">
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Input your email"
                className="fs-16 fw-500 fc-black"
                onChange={handleChange}
              />
              <button
                className={`fs-16 fw-500 fc-white bc-blue ${Style.button}`}
                onClick={() => handleSubmit('forgot', form.email)}
              >
                Send
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default LoginCard;
