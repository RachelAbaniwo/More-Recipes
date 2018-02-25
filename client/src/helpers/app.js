import axios from 'axios';
/**
 * sets axios
 * @function
 *
 * @param {null} null
 *
 * @returns {null} null
 */
export const setAxios = () => {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    axios.defaults.headers.common['token'] = JSON.parse(authUser).token;
  }
};

setAxios();
/**
 * executes when user is authenticated
 * @function
 *
 * @param {object} nextState
 * @param {object} replace
 *
 * @returns {null} null
 */
export const ifAuthenticated = (nextState, replace) => {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    replace({
      pathname: '/'
    });
  }
};
/**
 * executes when user isn't authenticated
 * @function
 *
 * @param {object} nextState
 * @param {object} replace
 *
 * @returns {null} null
 */
export const ifNotAuthenticated = (nextState, replace) => {
  const authUser = localStorage.getItem('authUser');
  if (!authUser) {
    replace({
      pathname: '/signin'
    });
  }
};
