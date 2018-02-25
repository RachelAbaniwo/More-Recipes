import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import recipesReducer from './recipesReducer';
import searchReducer from './searchReducer';
import notificationsReducer from './notificationsReducer';
import imageUploadReducer from './imageUploadReducer';
import authenticationReducer from './authenticationReducer';
import userProfileReducer from './userProfileReducer';
import sortReducer from './sortReducer';


export default combineReducers({
  recipes: recipesReducer,
  userProfile: userProfileReducer,
  authUser: authenticationReducer,
  routing: routerReducer,
  imageUpload: imageUploadReducer,
  notification: notificationsReducer,
  search: searchReducer,
  sort: sortReducer
});
