import { NOTIFICATION } from '../actions/notification';
/**
 * The notifications reducer
 * @param {object} state default recipes state
 * @param {object} action action to be reduced
 * @returns {object} new state
 */
export default (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
};
