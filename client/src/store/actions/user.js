import axios from 'axios';
import { push } from 'react-router-redux';
import { setAxios, unsetAxios } from '../../helpers/app';
import config from './../../config';
import setNotification from './notification';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';

/**
 * signs in user
 * @function
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {object} dispatch
 */
export function signInUser({ email, password }) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/users/signin`, {
        email, password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));
      setAxios();
      const { user } = response.data;

      dispatch({
        type: SIGN_IN_USER,
        authUser: response.data
      });
      dispatch(setNotification('success', `Welcome back ${user.username}.`));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

/**
 * signs out user
 * @function
 *
 * @param {null} null
 *
 * @returns {object} dispatch
 */
export function signOutUser() {
  return async (dispatch) => {
    await axios.post(`${config.apiUrl}/users/signout`);
    localStorage.removeItem('authUser');
    unsetAxios();
    dispatch({
      type: SIGN_OUT_USER
    });
    dispatch(setNotification('success', 'Successfully logged out.'));
    return Promise.resolve();
  };
}

/**
 * signs out user with expired token
 * @function
 *
 * @param {null} null
 *
 * @returns {object} dispatch
 */
export function signOutUserWithExpiredSession() {
  return async (dispatch) => {
    localStorage.removeItem('authUser');
    unsetAxios();
    dispatch({
      type: SIGN_OUT_USER
    });
    dispatch(setNotification('error', 'Session expired. Please sign in again.'));
    dispatch(push('/signin'));
    return Promise.resolve();
  };
}

/**
 *
 * registers new user
 * @function
 *
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} username
 * @param {string} password
 *
 * @returns {object} dispatch
 */
export function signUpUser({
  firstname, lastname, email, username, password
}) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/users/signup`, {
        firstname, lastname, email, username, password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));
      setAxios();
      dispatch({
        type: SIGN_IN_USER,
        authUser: response.data
      });
      dispatch(setNotification('success', 'Successfully signed up.'));
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  };
}

