import axios from 'axios';

export const login = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    const dataBody = { email: data.email, password: data.password };
    // console.log(dataBody);
    // console.log(process.env.REACT_APP_BASE_URL)
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/login`, dataBody)
      .then((res) => {
        const result = res.data.data;
        // console.log(result.role);
        // console.log(result.status);
        if (result.status === 1) {
          dispatch({ type: 'LOGIN_USER', payload: result });
          localStorage.setItem('token', result.token);
          resolve(result);
          return result;
        } else if (result.status === 0) {
          reject(new Error(`your account has not been activated`));
        } else {
          reject(new Error(`Email/Password wrong`));
        }
      })
      .catch((err) => {
        console.log(err.message);
        reject(err.message);
      });
  });
};
export const signup = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}/users/register`, data)
      .then((res) => {
        const result = res.data.data;
        // console.log(result.role);
        // console.log(result.status);
        dispatch({ type: 'SIGNUP_USER', payload: result });
        // localStorage.setItem('token', result.token)
        resolve(result);
        return result;
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const sendMail = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    // console.log(data);
    return axios
      .post(`${process.env.REACT_APP_BASE_URL}v1/users/confirm`, data)
      .then((res) => {
        dispatch({ type: 'FORGOT_USER', payload: data });
        resolve(res);
        return res;
      })
      .catch((err) => {
        reject(err.response.data.error.message);
      });
  });
};
export const renewPass = (data) => async (dispatch) => {
  return new Promise((resolve, reject) => {
    const dataPass = {
      password: data.password,
    };
    return axios
      .put(`${process.env.REACT_APP_BASE_URL}v1/users/forgot/${data.email}`, dataPass)
      .then((res) => {
        dispatch({ type: 'RENEW_PASS', payload: { email: data.email, password: data.password } });
        resolve(res);
        return res;
      })
      .catch((err) => {
        reject(err.response.data.error.message);
      });
  });
};
export const editProfile = (data, imgPrev) => (dispatch) => {
  return new Promise((resolve, reject) => {
    // console.log(data);
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    };
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('username', data.username);
    formData.append('phone', data.phone);
    formData.append('bio', data.bio);
    formData.append('img', data.img, data.img.name);
    // console.log(formData)
    return axios
      .put(`${process.env.REACT_APP_BASE_URL}/users/${data.id}`, formData, config)
      .then((res) => {
        const result = res.data.data;
        result.imgPrev = imgPrev
        // console.log(result.role)
        // console.log(result.status)
        dispatch({ type: 'UPDATE_USER', payload: result });
        // localStorage.setItem('token', result.token)
        resolve(result);
        return result;
      })
      .catch((err) => {
        console.log(err);
        reject(err.response);
      });
  });
};
export const deleteAcc = (user) => (dispatch) => {
  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${user.id}`, config)
  .then(() => {
    dispatch({ type: 'LOGOUT', payload: '' });
  })
  .catch((err) => {
    return err
  })
}
export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT', payload: '' });
};