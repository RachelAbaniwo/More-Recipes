import axios from 'axios';
import config from './../../config';

export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const NEW_RECIPE_ADDED = 'NEW_RECIPE_ADDED';
export const ADD_RECIPE_REVIEW = 'ADD_RECIPE_REVIEW';
export const SET_IMAGE_FILE = 'SET_IMAGE_FILE';


export function getAllRecipes() {
  return async (dispatch, getState) => {
    try {
      const response = await axios.get(`${config.apiUrl}/recipes`);
      const { pageData, recipes } = response.data;
      dispatch({
        type: GET_ALL_RECIPES,
        payload: { recipes, pageData }
      });
    } catch (error) {
      // dispatch error to store. 
    }
  }
}

export function setImageUrl(imageFile) {
  return (dispatch) => {
    dispatch({
      type: SET_IMAGE_FILE,
      payload: imageFile
    });
  };
}

export function createRecipe(recipe) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/recipes`, recipe);
      dispatch({
        type: NEW_RECIPE_ADDED,
        payload: response.data.recipe
      });
      dispatch(setNotification('success', `Successfully created recipe`));
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
}

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

export function createReview(review, recipeId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${config.apiUrl}/reviews/${recipeId}`, { review });
      dispatch({
        type: ADD_RECIPE_REVIEW,
        payload: response.data.review
      });
      dispatch(setNotification('success', `Review created successfully.`));
    } catch (error) {
      return Promise.reject();
    }
  };
}
