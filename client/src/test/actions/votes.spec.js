import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { NOTIFICATION } from '../../store/actions/notification';
import {
  toggleVote,
  toggleFavorite,
  TOGGLE_VOTE,
  TOGGLE_FAVORITES
} from '../../store/actions/votes';

describe('Votes actions', () => {
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
  };

  describe('The toggleVote action creator', () => {
    it('should dispatch TOGGLE_VOTE and setNotification when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            recipe: {
              id: 1,
              name: 'pancakes',
              upvotes: 1,
              downvotes: 2,
            },
            message: 'Successfully upvoted this recipe'
          }
        });
      });

      const store = mockStore(defaultState);

      const expectedActions = [
        {
          type: TOGGLE_VOTE,
          payload: { upvotes: 1, recipeId: 1, downvotes: 2 }
        },
        {
          type: NOTIFICATION,
          payload: {
            level: 'success',
            message: 'Successfully upvoted this recipe'
          }
        }
      ];
      store.dispatch(toggleVote(1, 'upvote')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
    it('should dispatch setNotification when an error message of unauthenticated is returned by the server', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: {
            data: {
              message: 'Unauthenticated'
            }
          }
        });
      });
      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: NOTIFICATION,
          payload: { level: 'error', message: 'Please signin to downvote this recipe.' }
        }
      ];
      store.dispatch(toggleVote(1, 'downvote')).then(() => {
      }).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
    it(
      'should dispatch setNotification when an error message of unauthenticated is returned by the server',
      (done) => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 401,
            response: {
              data: {
                message: 'Unauthorized'
              }
            }
          });
        });
        const store = mockStore(defaultState);
        const expectedAction = [
          {
            type: NOTIFICATION,
            payload: {
              level: 'error',
              message: 'You can\'t downvote a recipe you created.'
            }
          }
        ];
        store.dispatch(toggleVote(1, 'downvote')).then(() => {
        }).catch(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
      }
    );
  });
  describe('The toggleFavorite action creator', () => {
    it(
      'should dispatch TOGGLE_FAVORITES and setNotification when dispatched',
      (done) => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              recipe: {
                id: 1,
                name: 'pancakes',
                upvotes: 1,
                downvotes: 2,
                favorites: 1
              },
              favorite: {
                id: 1,
                name: 'favorite'
              },
              message: 'Successfully added this recipes to your favorites'
            }
          });
        });

        const store = mockStore(defaultState);

        const expectedActions = [
          {
            type: TOGGLE_FAVORITES,
            payload: {
              favorites: 1,
              recipeId: 1,
              userId: 1,
              newFavorite: {
                id: 1,
                name: 'favorite'
              },
            }
          },
          {
            type: NOTIFICATION,
            payload: {
              level: 'success',
              message: 'Successfully added this recipes to your favorites'
            }
          }
        ];
        store.dispatch(toggleFavorite(1)).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      }
    );
  });
  it('should dispatch setNotification when an error message of unauthenticated is returned by the server', (done) => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({
        status: 401,
        response: {
          data: {
            message: 'Unauthenticated'
          }
        }
      });
    });
    const store = mockStore(defaultState);
    const expectedAction = [
      {
        type: NOTIFICATION,
        payload: { level: 'error', message: 'Please signin to favorite this recipe.' }
      }
    ];
    store.dispatch(toggleFavorite(1)).then(() => {
    }).catch(() => {
      expect(store.getActions()).toEqual(expectedAction);
      done();
    });
  });
  it(
    'should dispatch setNotification when an error message of unauthenticated is returned by the server',
    (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({
          status: 401,
          response: {
            data: {
              message: 'Unauthorized'
            }
          }
        });
      });
      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: NOTIFICATION,
          payload: {
            level: 'error',
            message: 'You can\'t favorite a recipe you created.'
          }
        }
      ];
      store.dispatch(toggleFavorite(1)).then(() => {
      }).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    }
  );
});
