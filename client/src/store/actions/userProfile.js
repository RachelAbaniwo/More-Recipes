import axios from 'axios';
import config from './../../config';
import setNotification from './notification';
import { clearImageUrl } from '../actions/recipes';

export const GET_MY_RECIPES = 'GET_MY_RECIPES';
export const GET_MY_FAVORITES = 'GET_MY_FAVORITES';
export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';
/**
 * @function
 *
 * @param {object} queryParams params
 * @param {object} getState getState
 *
 * @returns {object} dispatch
 */
export function getMyRecipes() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${config.apiUrl}/users/myrecipes`);
      const { myRecipes } = response.data;
      dispatch({
        type: GET_MY_RECIPES,
        payload: { myRecipes }
      });
    } catch (error) {
      if (error.response.data.message === 'You have no recipes') {
        dispatch(setNotification('error', 'You have no recipes'));
        return Promise.reject();
      }
    }
  };
}
/**
 * @function
 *
 * @param {object} queryParams params
 * @param {object} getState getState
 *
 * @returns {object} dispatch
 */
export function getMyFavorites() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${config.apiUrl}/favorites`);
      const { favoriteRecipes } = response.data;
      dispatch({
        type: GET_MY_FAVORITES,
        payload: { favoriteRecipes }
      });
    } catch (error) {
      if (error.response.data.message === 'You have no Favorite Recipes') {
        dispatch(setNotification('error', 'You have no Favorite Recipes'));
        return Promise.reject();
      }
    }
  };
}

/**
 * Update user profile
 * @param {object} user
 * @param {number} userId
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
      return Promise.reject(error);
    }

  }
}
