import axios from 'axios';
import queryString from 'query-string';
import config from './../../config';
import setNotification from './notification';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const NEW_RECIPE_ADDED = 'NEW_RECIPE_ADDED';
export const ADD_RECIPE_REVIEW = 'ADD_RECIPE_REVIEW';
export const SET_IMAGE_FILE = 'SET_IMAGE_FILE';

/**
 * @function
 *
 * @param {object} queryParams params
 * @param {object} getState getState
 *
 * @returns {object} dispatch
 */
export function getAllRecipes(queryParams) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${config.apiUrl}/recipes?${queryString.stringify(queryParams)}`);
      const { pageData, recipes } = response.data;
      dispatch({
        type: GET_ALL_RECIPES,
        payload: { recipes, pageData }
      });
    } catch (error) {
      // dispatch error to store.
    }
  };
}

/**
 * @function
 *
 * @param {object} imageFile
 *
 * @returns {object} dispatch
 */
export function setImageUrl(imageFile) {
  return (dispatch) => {
    dispatch({
      type: SET_IMAGE_FILE,
      payload: imageFile
    });
  };
}
/**
 * @function
 *
 * @param {object} recipe
 *
 * @returns {object} dispatch
 */
export function createRecipe(recipe) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/recipes`, recipe);
      dispatch({
        type: NEW_RECIPE_ADDED,
        payload: response.data.recipe
      });
      dispatch(setNotification('success', 'Successfully created recipe'));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
}
/**
 * @function
 *
 * @param {number} recipeId
 *
 * @returns {object} dispatch
 * @returns {object} getState
 */
export function getRecipe(recipeId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${config.apiUrl}/recipes/${recipeId}`);
      dispatch({
        type: NEW_RECIPE_ADDED,
        payload: response.data.recipe
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
}
/**
 * @function
 *
 * @param {string} review
 * @param {number} recipeId
 *
 * @returns {object} dispatch
 * @returns {object} getState
 */
export function createReview(review, recipeId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${config.apiUrl}/reviews/${recipeId}`, { review });
      dispatch({
        type: ADD_RECIPE_REVIEW,
        payload: response.data.review
      });
      dispatch(setNotification('success', 'Review created successfully.'));
    } catch (error) {
      if (error.response.data.message === 'Unauthenticated') {
        dispatch(setNotification('error', 'Please signin to review this recipe'));
        return Promise.reject();
      }
    }
  };
}
