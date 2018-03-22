import notificationsReducer from '../../store/reducers/notificationsReducer';
import { NOTIFICATION } from '../../store/actions/notification';

describe('the notificationsReducer', () => {
  it('should return initial state when the redux store initializes', () => {
    const initialState = {
      notification: null
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };

    const result = notificationsReducer(undefined, action);
    expect(result).toEqual(initialState);
  });
  it('should maintain state if an invalid action is passed.', () => {
    const state = {
      level: 'success',
      message: 'successfully signed in'
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };
    const result = notificationsReducer(state, action);
    expect(result).toEqual(state);
  });
  it('should add a notification to the state when NOTIFICATION is called', () => {
    const state = {
      notification: null
    };

    const newState = {
      level: 'success',
      message: 'successfully signed in'
    };

    const action = {
      type: NOTIFICATION,
      payload: {
        level: 'success',
        message: 'successfully signed in'
      }
    };
    const result = notificationsReducer(state, action);
    expect(result).toEqual(newState);
  });
});
