import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { SIGN_OUT_USER } from '../../store/actions/user';
import { NOTIFICATION } from '../../store/actions/notification';
import { CLEAR_IMAGE_FILE } from '../../store/actions/recipes';
import {
  getMyRecipes,
  getMyFavorites,
  updateUserProfile,
  GET_MY_RECIPES,
  GET_MY_FAVORITES,
  UPDATE_USER_PROFILE
} from '../../store/actions/userProfile';

const REDIRECT_USER = '@@router/CALL_HISTORY_METHOD';

describe('UserProfile Actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  const mockStore = configureStore([thunk]);

  const defaultState = {
    authUser: {
      user: {
        id: 1, username: 'defaultName', token: 'token', email: 'default@test.com'
      }
    },
    notification: null,
    imageUpload: {
      imageFile: null
    },
  };

  describe('The getMyRecipes action creator', () => {
    it(
      'should dispatch GET_MY_RECIPES when dispatched',
      (done) => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              myRecipes: [
                { id: 1, name: 'pancakes' },
                { id: 2, name: 'beef sauce' }
              ]
            }
          });
        });

        const store = mockStore(defaultState);

        const expectedAction = [
          {
            type: GET_MY_RECIPES,
            payload: {
              myRecipes: [
                { id: 1, name: 'pancakes' },
                { id: 2, name: 'beef sauce' }
              ]
            }
          }
        ];
        store.dispatch(getMyRecipes()).then(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
      }
    );
    it('should dispatch signOutUserWithExpiredSession when an error message of token expired is returned by the server', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: {
            data: {
              message: 'Token Expired.'
            }
          }
        });
      });
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
      store.dispatch(getMyRecipes()).then(() => {
      }).catch(() => {
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
        store.dispatch(getMyRecipes()).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The favoriteRecipes action creator', () => {
    it('should dispatch GET_MY_FAVORITES when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            favoriteRecipes: [
              { id: 1, name: 'pancakes' },
              { id: 2, name: 'beef sauce' }
            ]
          }
        });
      });

      const store = mockStore(defaultState);

      const expectedAction = [
        {
          type: GET_MY_FAVORITES,
          payload: {
            favoriteRecipes: [
              { id: 1, name: 'pancakes' },
              { id: 2, name: 'beef sauce' }
            ]
          }
        }
      ];

      store.dispatch(getMyFavorites()).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
    it('should dispatch signOutUserWithExpiredSession when an error message of token expired is returned by the server', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: {
            data: {
              message: 'Token Expired.'
            }
          }
        });
      });
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
      store.dispatch(getMyFavorites()).then(() => {
      }).catch(() => {
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
        store.dispatch(getMyFavorites()).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The updateUserProfile action creator', () => {
    it(
      'should dispatch UPDATE_USER_PROFILE, clearImageUrl and setNotification',
      (done) => {
        localStorage.setItem('authUser', JSON.stringify(defaultState.authUser));
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

        const expectedActions = [
          {
            type: UPDATE_USER_PROFILE,
            authUser: {
              user: {
                id: 2, username: 'Name', token: 'token', email: 'name@test.com'
              }
            }
          },
          {
            type: CLEAR_IMAGE_FILE
          },
          {
            type: NOTIFICATION,
            payload: {
              level: 'success', message: 'Successfully updated your profile'
            }
          },
        ];
        const store = mockStore(defaultState);
        store.dispatch(updateUserProfile({ username: 'user-name' }, 2)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      }
    );
    it('should dispatch signOutUserWithExpiredSession when an error message of token expired is returned by the server', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: {
            data: {
              message: 'Token Expired.'
            }
          }
        });
      });
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
      store.dispatch(updateUserProfile()).then(() => {
      }).catch(() => {
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
        store.dispatch(updateUserProfile()).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
});
