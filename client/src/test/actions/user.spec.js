import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { NOTIFICATION } from '../../store/actions/notification';
import {
  signInUser,
  signUpUser,
  signOutUserWithExpiredSession,
  signOutUser,
  SIGN_IN_USER,
  SIGN_OUT_USER
} from '../../store/actions/user';

const REDIRECT_USER = '@@router/CALL_HISTORY_METHOD';

describe('User actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const mockStore = configureStore([thunk]);
  const defaultState = {
    authUser: {},
    notification: null,
  };
  describe('The signInUser action creator', () => {
    it('should dispatch SIGN_IN_USER and setNotification when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            user: {
              id: 2, username: 'Name', token: 'token', email: 'name@test.com'
            }
          }
        });
      });

      const store = mockStore(defaultState);

      const expectedActions = [
        {
          type: SIGN_IN_USER,
          authUser: {
            user: {
              id: 2, username: 'Name', token: 'token', email: 'name@test.com'
            }
          }
        },
        {
          type: NOTIFICATION,
          payload: {
            level: 'success', message: 'Welcome back Name.'
          }
        },
      ];

      store.dispatch(signInUser({ email: 'name@test.com', password: 'name' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it(
      'should not dispatch an action when an error is returned from the server',
      (done) => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 500,
            response: {
              data: {
                message: 'Server Error'
              }
            }
          });
        });
        const store = mockStore(defaultState);
        store.dispatch(signInUser({})).then(() => {
        }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The signUpUser action creator', () => {
    it('should dispatch  SIGN_IN_USER and setNotification when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            user: {
              id: 2, username: 'Name', token: 'token', email: 'test@test.com'
            }
          }
        });
      });

      const store = mockStore(defaultState);

      const expectedActions = [
        {
          type: SIGN_IN_USER,
          authUser: {
            user: {
              id: 2, username: 'Name', token: 'token', email: 'test@test.com'
            }
          }
        },
        {
          type: NOTIFICATION,
          payload: {
            level: 'success', message: 'Successfully signed up.'
          }
        },
      ];

      store.dispatch(signUpUser({ email: 'test@test.com', password: 'name' }))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it(
      'should not dispatch an action when an error is returned from the server',
      (done) => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 500,
            response: {
              data: {
                message: 'Server Error'
              }
            }
          });
        });
        const store = mockStore(defaultState);
        store.dispatch(signUpUser({})).then(() => {
        }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The signOutUser action creator', () => {
    it('should dispatch SIGN_OUT_USER and setNotification when dispatched', (done) => {
      const store = mockStore(defaultState);

      const expectedActions = [
        {
          type: SIGN_OUT_USER
        },
        {
          type: NOTIFICATION,
          payload: {
            level: 'success',
            message: 'Successfully logged out.'
          }
        }
      ];

      store.dispatch(signOutUser({})).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
  });
  describe(' The signOutUserWithExpiredSession action creator', () => {
    it(
      'should dispatch SIGN_OUT_USER, setNotification and REDIRECT_USER when dispatched', 
      (done) => {
        const store = mockStore(defaultState);

        const expectedActions = [
          {
            type: SIGN_OUT_USER
          },
          {
            type: NOTIFICATION,
            payload: { level: 'error', message: 'Session expired. Please sign in again.' }
          },
          {
            type: REDIRECT_USER,
            payload: {
              args: ['/signin'], method: 'push'
            }
          }
        ];

        store.dispatch(signOutUserWithExpiredSession({})).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      }
    );
  });
});
