import axios from 'axios';
import config from './../../config';
import setNotification from './notification';

export const SIGN_IN_USER = 'SIGN_IN_USER';
export const SIGN_OUT_USER = 'SIGN_OUT_USER';
/**
 * @function
 *
 * @param {string} email
 * @param {string} password
 *
 * @returns {object} dispatch
 * @returns {object} getState
 */
export function signInUser({ email, password }) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${config.apiUrl}/users/signin`, {
        email, password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));
      const { user } = response.data;

      dispatch({
        type: SIGN_IN_USER,
        authUser: response.data
      });
      dispatch(setNotification('success', `Welcome back ${user.username}.`));
    } catch (error) {
      return Promise.reject(error);
    }
  };
}
/**
 * @function
 *
 * @param {null} null
 *
 * @returns {object} dispatch
 * @returns {object} getState
 */
export function signOutUser() {
  return async (dispatch) => {
    localStorage.removeItem('authUser');
    dispatch({
      type: SIGN_OUT_USER
    });
    dispatch(setNotification('success', 'Successfully logged out.'));
    return Promise.resolve();
  };
}
/**
 * @function
 *
 * @param {string} firstname
 * @param {string} lastname
 * @param {string} email
 * @param {string} username
 * @param {string} password
 *
 * @returns {object} dispatch
 * @returns {object} getState
 */
export function signUpUser({
  firstname, lastname, email, username, password
}) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${config.apiUrl}/users/signup`, {
        firstname, lastname, email, username, password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));

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

