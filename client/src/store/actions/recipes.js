import axios from 'axios';
import queryString from 'query-string';
import config from './../../config';
import setNotification from './notification';
import { signOutUserWithExpiredSession } from './user';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPES = 'GET_RECIPES';
export const NEW_RECIPE_ADDED = 'NEW_RECIPE_ADDED';
export const ADD_RECIPE_REVIEW = 'ADD_RECIPE_REVIEW';
export const SET_IMAGE_FILE = 'SET_IMAGE_FILE';
export const CLEAR_IMAGE_FILE = 'CLEAR_IMAGE_FILE';
export const UPDATE_RECIPE = 'UPDATE_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const UPDATE_SEARCH_STRING = 'UPDATE_SEARCH_STRING';
export const UPDATE_SORT_QUERY = 'UPDATE_SORT_QUERY';

/**
 * gets all recipes
 * @function
 *
 * @param {object} queryParams params
 *
 * @returns {object} dispatch
 */
export function getAllRecipes(queryParams) {
  return async (dispatch, getState) => {
    try {
      queryParams.offset = parseInt(queryParams.limit, 10) * (queryParams.page);
      queryParams.search = getState().search.query;
      queryParams.sort = getState().sort.sort;
      const response = await axios.get(`${config.apiUrl}/recipes?${queryString.stringify(queryParams)}`);
      const { pageData, recipes } = response.data;
      dispatch({
        type: GET_ALL_RECIPES,
        payload: { recipes, pageData }
      });
      return Promise.resolve();
    } catch (error) {
      if (error.response.data.message === 'Recipe not found') {
        dispatch(setNotification('error', 'Recipe not found'));
        return Promise.reject();
      }
      return Promise.reject();
    }
  };
}

/**
 * sets image url
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
    return Promise.resolve();
  };
}

/**
 * clears the image url
 * @function
 *
 * @param {null} null
 *
 * @returns {object} dispatch
 */
export function clearImageUrl() {
  return (dispatch) => {
    dispatch({
      type: CLEAR_IMAGE_FILE
    });
    return Promise.resolve();
  };
}

/**
 * creates a recipe
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
      dispatch(setNotification('success', 'Successfully created recipe'));
      dispatch(clearImageUrl());
      return Promise.resolve(response.data.recipe);
    } catch (error) {
      if (error.response.data.message === 'Token Expired.') {
        dispatch(signOutUserWithExpiredSession());
      }
      return Promise.reject(error);
    }
  };
}

/**
 * updates a recipe
 * @function
 *
 * @param {object} recipe
 * @param {number} recipeId
 *
 * @returns {object} dispatch
 */
export function updateRecipe(recipe, recipeId) {
  return async (dispatch) => {
    try {
      const response = await axios.put(`${config.apiUrl}/recipes/${recipeId}`, recipe);
      dispatch({
        type: UPDATE_RECIPE,
        payload: response.data.recipe
      });
      dispatch(clearImageUrl());
      dispatch(setNotification('success', 'Successfully updated recipe'));
      return Promise.resolve();
    } catch (error) {
      if (error.response.data.message === 'Token Expired.') {
        dispatch(signOutUserWithExpiredSession());
      }
      return Promise.reject(error);
    }
  };
}

/**
 * deletes a recipe
 * @function
 *
 * @param {number} recipeId
 *
 * @returns {object} dispatch
 */
export function deleteRecipe(recipeId) {
  return async (dispatch) => {
    try {
      await axios.delete(`${config.apiUrl}/recipes/${recipeId}`);
      dispatch({
        type: DELETE_RECIPE,
        payload: recipeId
      });

      dispatch(setNotification('success', 'Successfully deleted recipe'));
      return Promise.resolve();
    } catch (error) {
      if (error.response.data.message === 'Token Expired.') {
        dispatch(signOutUserWithExpiredSession());
      }
      return Promise.reject(error);
    }
  };
}
/**
 * gets a recipe
 * @function
 *
 * @param {number} recipeId
 *
 * @returns {object} dispatch
 * @returns {object} getState
 */
export function getRecipe(recipeId) {
  return async (dispatch) => {
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
 * adds a review
 * @function
 *
 * @param {string} review
 * @param {number} recipeId
 *
 * @returns {object} dispatch
 * @returns {object} getState
 */
export function createReview(review, recipeId) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/recipes/${recipeId}/reviews`, { review });
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
      return Promise.reject();
    }
  };
}

/**
 * updates recipe search query
 * @function
 *
 * @param {string} query
 *
 * @returns {object} dispatch
 */
export function updateSearchQuery(query) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_SEARCH_STRING,
      payload: query
    });
    return Promise.resolve();
  };
}

/**
 * updates recipe sort query
 * @function
 *
 * @param {string} query
 *
 * @returns {object} dispatch
 */
export function updateSortQuery(query) {
  return async (dispatch) => {
    dispatch({
      type: UPDATE_SORT_QUERY,
      payload: query
    });
    return Promise.resolve();
  };
}
