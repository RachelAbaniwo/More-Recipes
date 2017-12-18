import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const defaultState = {
  authUser: null
};

export default createStore(
  reducer,
  defaultState,
  applyMiddleware(thunk)
);
