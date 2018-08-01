import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { NOTIFICATION } from '../../store/actions/notification';
import {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getAllRecipes,
  setImageUrl,
  updateSearchQuery,
  clearImageUrl,
  updateSortQuery,
  getRecipe,
  createReview,
  UPDATE_RECIPE,
  CLEAR_IMAGE_FILE,
  DELETE_RECIPE,
  GET_ALL_RECIPES,
  NEW_RECIPE_ADDED,
  ADD_RECIPE_REVIEW,
  SET_IMAGE_FILE,
  UPDATE_SEARCH_STRING,
  UPDATE_SORT_QUERY
} from '../../store/actions/recipes';
import { SIGN_OUT_USER } from '../../store/actions/user';

const REDIRECT_USER = '@@router/CALL_HISTORY_METHOD';

describe('Recipe actions', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  const mockStore = configureStore([thunk]);

  const defaultState = {
    recipes: {
      rows: [],
      pageData: {}
    },
    imageUpload: {
      imageFile: null
    },
    notification: null,
    search: { query: '' },
    sort: ''
  };

  describe('The createRecipe action creator', () => {
    it('should dispatch setNotifications and clearImageUrl when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });
      const store = mockStore(defaultState);

      const expectedActions = [
        {
          type: NOTIFICATION,
          payload: { level: 'success', message: 'Successfully created recipe' }
        },
        {
          type: CLEAR_IMAGE_FILE
        }
      ];
      store.dispatch(createRecipe({ name: 'food' })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
      store.dispatch(createRecipe({ name: 'food' })).then(() => {
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
        store.dispatch(createRecipe({})).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The updateRecipe action creator', () => {
    it('should dispatch UPDATE_RECIPE, setNotifications and clearImageUrl when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            recipe: { id: 1, userId: 2, name: 'food' }
          }
        });
      });
      const store = mockStore(defaultState);

      const expectedActions = [
        {
          type: UPDATE_RECIPE,
          payload: { id: 1, userId: 2, name: 'food' }
        },
        {
          type: CLEAR_IMAGE_FILE
        },
        {
          type: NOTIFICATION,
          payload: { level: 'success', message: 'Successfully updated recipe' }
        },
      ];
      store.dispatch(updateRecipe({ name: 'food' })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
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
      store.dispatch(updateRecipe({ name: 'food' })).then(() => {
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
        store.dispatch(updateRecipe({})).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The deleteRecipe action', () => {
    it('should dispatch DELETE_RECIPE and setNotification when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {}
        });
      });
      const store = mockStore(defaultState);

      const expectedActions = [
        {
          type: DELETE_RECIPE,
          payload: { recipeId: 1 }
        },
        {
          type: NOTIFICATION,
          payload: { level: 'success', message: 'Successfully deleted recipe' }
        },
      ];
      store.dispatch(deleteRecipe({ recipeId: 1 })).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        done();
      });
    });
    it(
      'should dispatch signOutUserWithExpiredSession when an error message of token expired is returned by the server',
      (done) => {
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
            payload: {
              level: 'error', message: 'Session expired. Please sign in again.'
            }
          },
          {
            type: REDIRECT_USER,
            payload: {
              args: ['/signin'], method: 'push'
            }
          }
        ];
        store.dispatch(deleteRecipe({ name: 'food' })).then(() => {
        }).catch(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      }
    );
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
        store.dispatch(deleteRecipe({})).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The getAllRecipes actions', () => {
    it('should dispatch GET_ALL_RECIPES when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            recipes: [
              { id: 1, name: 'Chips' },
              { id: 2, name: 'Veggie Rice' }
            ],
            pageData: { pageCount: 3, page: 2 }
          }
        });
      });

      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: GET_ALL_RECIPES,
          payload: {
            recipes: [
              { id: 1, name: 'Chips' },
              { id: 2, name: 'Veggie Rice' }
            ],
            pageData: { pageCount: 3, page: 2 }
          }
        }
      ];
      store.dispatch(getAllRecipes({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
    it(
      'should dispatch setNotification when a recipe searched for is not found',
      (done) => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.reject({
            status: 404,
            response: {
              data: {
                message: 'Recipe not found'
              }
            }
          });
        });
        const store = mockStore(defaultState);
        const expectedAction = [
          {
            type: NOTIFICATION,
            payload: { level: 'error', message: 'Recipe not found' }
          },
        ];
        store.dispatch(getAllRecipes({})).then(() => { }).catch(() => {
          expect(store.getActions()).toEqual(expectedAction);
          done();
        });
      }
    );
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
        store.dispatch(getAllRecipes({})).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The getRecipe action', () => {
    it('should dispatch NEW_RECIPE_ADDED when dispatched', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            recipe: { id: 3, name: 'Carrot sauce' }
          }
        });
      });
      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: NEW_RECIPE_ADDED,
          payload: { id: 3, name: 'Carrot sauce' }
        }
      ];
      store.dispatch(getRecipe({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
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
                message: 'Recipe not found'
              }
            }
          });
        });
        const store = mockStore(defaultState);
        store.dispatch(getRecipe({})).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The createReview action', () => {
    it(
      'should dispatch ADD_RECIPE_REVIEW and setNotification when dispatched',
      (done) => {
        moxios.wait(() => {
          const request = moxios.requests.mostRecent();
          request.respondWith({
            status: 200,
            response: {
              review: { id: 1, review: 'review' }
            }
          });
        });

        const store = mockStore(defaultState);
        const expectedActions = [
          {
            type: ADD_RECIPE_REVIEW,
            payload: { id: 1, review: 'review' }
          },
          {
            type: NOTIFICATION,
            payload: {
              level: 'success', message: 'Review created successfully.'
            }
          },
        ];
        store.dispatch(createReview({})).then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
      }
    );
    it('should dispatch setNotification if user is unauthenticated', (done) => {
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
          payload: {
            level: 'error', message: 'Please signin to review this recipe'
          }
        }
      ];
      store.dispatch(createReview({})).then(() => { }).catch(() => {
        expect(store.getActions()).toEqual(expectedAction);
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
        store.dispatch(createReview({})).then(() => { }).catch(() => {
          expect(store.getActions().length).toEqual(0);
          done();
        });
      }
    );
  });
  describe('The setImageUrl action', () => {
    it('should dispatch SET_IMAGE_FILE when dispatch', (done) => {
      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: SET_IMAGE_FILE,
          payload: { preview: 'image.jpg' }
        }
      ];
      store.dispatch(setImageUrl({ preview: 'image.jpg' })).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
  });
  describe('The clearImageUrl action', () => {
    it('should dispatch CLEAR_IMAGE_FILE when dispatch', (done) => {
      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: CLEAR_IMAGE_FILE
        }
      ];
      store.dispatch(clearImageUrl({})).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
        done();
      });
    });
  });
  describe('The updateSearchQuery action', () => {
    it('should dispatch UPDATE_SEARCH_STRING when dispatched', () => {
      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: UPDATE_SEARCH_STRING,
          payload: 'query'
        }
      ];
      store.dispatch(updateSearchQuery('query')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
  describe('The updateSortQuery action', () => {
    it('should dispatch UPDATE_SORT_QUERY when dispatched', () => {
      const store = mockStore(defaultState);
      const expectedAction = [
        {
          type: UPDATE_SORT_QUERY,
          payload: 'upvotes'
        }
      ];
      store.dispatch(updateSortQuery('upvotes')).then(() => {
        expect(store.getActions()).toEqual(expectedAction);
      });
    });
  });
});
