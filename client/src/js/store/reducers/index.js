import { combineReducers } from 'redux';

import recipesReducer from './recipesReducer';
import authenticationReducer from './authenticationReducer';


export default combineReducers({
  recipes: recipesReducer,
  authUser: authenticationReducer
});
