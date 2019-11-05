import axios from 'axios';
import {SIGN_IN, SIGN_UP} from '../types';
export const signUp = () => {
  return {
    type: SIGN_UP,
    payload: {
      email: 'ujjal@gmail.com',
      token: 'hdbchddcd',
    },
  };
};
export const signIn = () => {
  return {
    type: SIGN_IN,
    payload: {
      email: 'ujjal@gmail.com',
      token: 'hdbchddcd',
    },
  };
};
