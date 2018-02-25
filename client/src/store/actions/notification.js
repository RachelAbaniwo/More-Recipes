export const NOTIFICATION = 'NOTIFICATION';
/**
 * sets notifications
 * @function
 *
 * @param {*} level
 * @param {*} message
 *
 * @returns {object} action
 */
const setNotification = (level, message) => ({
  type: NOTIFICATION,
  payload: {
    level, message
  }
});

export default setNotification;

