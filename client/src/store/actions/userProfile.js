import axios from 'axios';
import config from './../../config';
import setNotification from './notification';
import { clearImageUrl } from '../actions/recipes';

import { signOutUserWithExpiredSession } from './user';

export const GET_MY_RECIPES = 'GET_MY_RECIPES';
export const GET_MY_FAVORITES = 'GET_MY_FAVORITES';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

/**
 * gets a user's recipes
 * @function
 *
 * @param {object} queryParams params
 * @param {object} getState getState
 *
 * @returns {object} dispatch
 */
export function getMyRecipes() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/users/myrecipes`);
      const { myRecipes } = response.data;
      dispatch({
        type: GET_MY_RECIPES,
        payload: { myRecipes }
      });
    } catch (error) {
      if (error.response.data.message === 'Token Expired.') {
        dispatch(signOutUserWithExpiredSession());
      }
      return Promise.reject();
    }
  };
}
/**
 * gets a user's favorite recipes
 * @function
 *
 * @returns {object} dispatch
 */
export function getMyFavorites() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/favorites`);
      const { favoriteRecipes } = response.data;
      dispatch({
        type: GET_MY_FAVORITES,
        payload: { favoriteRecipes }
      });
      return Promise.resolve();
    } catch (error) {
      if (error.response.data.message === 'Token Expired.') {
        dispatch(signOutUserWithExpiredSession());
      }
      return Promise.reject();
    }
  };
}

/**
 * Updates a user's profile
 *
 * @param {object} user
 * @param {number} userId
 *
 * @return {promise} promise
 */
export function updateUserProfile(user, userId) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${config.apiUrl}/users/${userId}`, user);
      const localUserData = JSON.parse(localStorage.getItem('authUser'));
      localUserData.user = response.data.user;
      localStorage.setItem('authUser', JSON.stringify(localUserData));
      dispatch({
        type: UPDATE_USER_PROFILE,
        authUser: response.data
      });
      dispatch(clearImageUrl());
      dispatch(setNotification('success', 'Successfully updated your profile'));
      return Promise.resolve();
    } catch (error) {
      if (error.response.data.message === 'Token Expired.') {
        dispatch(signOutUserWithExpiredSession());
      }
      return Promise.reject(error);
    }
  };
}

