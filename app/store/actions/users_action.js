import axios from 'axios';
import {SIGNUP, SIGNIN, FIREBASEURL, REFRESH} from '../../utils/misc';

import {SIGN_IN, SIGN_UP, AUTO_SIGN_IN} from '../types';
export const signUp = data => {
  const request = axios({
    method: 'POST',
    url: SIGNUP,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(e => false);

  return {
    type: SIGN_UP,
    payload: request,
  };
};
export const signIn = data => {
  const request = axios({
    method: 'POST',
    url: SIGNIN,
    data: {
      email: data.email,
      password: data.password,
      returnSecureToken: true,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      console.log(res.data);
      return res.data;
    })
    .catch(e => false);
  return {
    type: SIGN_IN,
    payload: request,
  };
};

export const autoSignIn = refToken => {
  const request = axios({
    method: 'POST',
    url: REFRESH,
    data: 'grant_type=refresh_token&refresh_token=' + refToken,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
    .then(res => {
      return res.data;
    })
    .catch(e => false);

  return {
    type: AUTO_SIGN_IN,
    payload: request,
  };
};
