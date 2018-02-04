import axios from 'axios';
/**
 * @function
 *
 * @param {null} null
 *
 * @returns {null} null
 */
export function setAxios() {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    axios.defaults.headers.common['token'] = JSON.parse(authUser).token;
  }
}

setAxios();
/**
 * @function
 *
 * @param {object} nextState
 * @param {object} replace
 *
 * @returns {null} null
 */
export function ifAuthenticated(nextState, replace) {
  const authUser = localStorage.getItem('authUser');
  if (authUser) {
    replace({
      pathname: '/'
    });
  }
}
/**
 * @function
 *
 * @param {object} nextState
 * @param {object} replace
 *
 * @returns {null} null
 */
export function ifNotAuthenticated(nextState, replace) {
  const authUser = localStorage.getItem('authUser');
  if (!authUser) {
    replace({
      pathname: '/signin'
    });
  }
}
