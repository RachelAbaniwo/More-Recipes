export const NOTIFICATION = 'NOTIFICATION';
/**
 * sets notifications
 * @function
 *
 * @param {string} level
 * @param {string} message
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

