import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const defaultState = {
  authUser: JSON.parse(localStorage.getItem('authUser')),
  recipes: {
    rows: [],
    pageData: {}
  },
  imageUpload: {
    imageFile: null
  },
  notification: null,
  search: { query: '' }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);
