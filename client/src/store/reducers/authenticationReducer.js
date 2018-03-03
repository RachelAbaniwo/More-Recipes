import { SIGN_IN_USER, SIGN_OUT_USER } from '../actions/user';
import { UPDATE_USER_PROFILE } from '../actions/userProfile';
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
    case UPDATE_USER_PROFILE:
      return {
        ...action.authUser
      };
    case SIGN_OUT_USER:
      return null;
    default:
      return state;
  }
}
