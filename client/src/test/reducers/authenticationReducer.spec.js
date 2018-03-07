import { SIGN_OUT_USER, SIGN_IN_USER } from '../../store/actions/user';
import { UPDATE_USER_PROFILE } from '../../store/actions/userProfile';
import authenticationReducer from '../../store/reducers/authenticationReducer';

describe('authenticationReducer', () => {
  it('should maintain state if none of the actions are handled by reducer', () => {
    const action = { type: 'UNDEFINED_ACTION' };
    const state = { authUser: { user: { id: 1 } } };
    const result = authenticationReducer(state, action);

    expect(result).toEqual(state);
  });
  it('should return default state when initialized by redux', () => {
    const action = { type: 'UNDEFINED_ACTION' };
    const initialState = {};
    const result = authenticationReducer(undefined, action);

    expect(result).toEqual(initialState);
  });
  it('should return null if SIGN_OUT_USER is passed as an action', () => {
    const state = {};
    const action = { type: SIGN_OUT_USER };
    const result = authenticationReducer(state, action);

    expect(result).toBe(null);
  });
  it('should return auth user if action type passed to it is UPDATE_USER_PROFILE', () => {
    const state = {};
    const action = {
      type: UPDATE_USER_PROFILE,
      authUser: { user: { id: 2 } }
    };

    const result = authenticationReducer(state, action);
    expect(result).toEqual(action.authUser);
  });

  it('should return auth user if action type passed to it is SIGN_IN_USER', () => {
    const state = {};
    const action = {
      type: SIGN_IN_USER,
      authUser: { user: { id: 2 } }
    };

    const result = authenticationReducer(state, action);
    expect(result).toEqual(action.authUser);
  });
});
