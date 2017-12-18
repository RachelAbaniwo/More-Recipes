export default function authenticationReducer(state = {}, action) {
  switch (action.type) {
    case 'SIGN_IN_USER':
      return action.authUser;
    case 'SIGN_OUT_USER':
      let newState = state;
      newState = null;
      return newState;
    default:
    return state;

  }
}