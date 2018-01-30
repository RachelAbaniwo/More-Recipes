export const NOTIFICATION = 'NOTIFICATION';

const setNotification = (level, message) => ({
  type: NOTIFICATION,
  payload: {
    level, message
  }
}); 

export default setNotification;
