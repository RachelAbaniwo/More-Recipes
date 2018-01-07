import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import recipesReducer from './recipesReducer';
import imageUploadReducer from './imageUploadReducer';
import authenticationReducer from './authenticationReducer';


export default combineReducers({
  recipes: recipesReducer,
  authUser: authenticationReducer,
  routing: routerReducer,
  imageUpload: imageUploadReducer
});
