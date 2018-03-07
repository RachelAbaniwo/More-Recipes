import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import setNotification, { NOTIFICATION } from '../../store/actions/notification';

describe('Notifications actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const mockStore = configureStore([thunk]);
  const defaultState = {
    notification: null,
  };
  describe('setNotification action creator', () => {
    it('should dispatch NOTIFICATION when dispatched', () => {
      const store = mockStore(defaultState);

      const expectedAction = [
        {
          type: NOTIFICATION,
          payload: {
            level: 'success',
            message: 'notification'
          }
        }
      ];
      store.dispatch(setNotification('success', 'notification'));
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
