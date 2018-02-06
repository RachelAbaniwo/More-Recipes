import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions/user';
/**
 * The authentication reducer
 * @param {object} state default authUser state
 * @param {object} action action to be reduced
 * @returns {object} new state
 */
export default function authenticationReducer(state = {}, action) {
  switch (action.type) {
    case SIGN_IN_USER:
      return {
        ...action.authUser
      };
    case SIGN_OUT_USER:
      let newState = state;
      newState = null;
      return newState;
    default:
      return state;
  }
}
