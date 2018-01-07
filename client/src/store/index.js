/* eslint-disable no-underscore-dangle,no-undef */
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const defaultState = {
  authUser: null,
  recipes: [],
  imageUpload: {
    imageFile: null
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  reducer,
  defaultState,
  composeEnhancers(applyMiddleware(thunk))
);
