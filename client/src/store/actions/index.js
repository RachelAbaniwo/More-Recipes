/* eslint-disable */

import axios from 'axios';


export function setImageUrl(imageFile) {
  return (dispatch) => {
    dispatch({
      type: 'SET_IMAGE_FILE',
      payload: imageFile
    });
  };
}

export function signInUser({ email, password }) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`http://localhost:4044/api/v1/users/signin`, {
        email, password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));

      dispatch({
        type: 'SIGN_IN_USER',
        authUser: response.data
      });

      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
  };
}

export function createRecipe(recipe) {
  return async (dispatch) => {
    try {
      console.log(recipe);
      const response = await axios.post('http://localhost:4044/api/v1/recipes', recipe);
      console.log(response);
      dispatch({
        type: 'NEW_RECIPE_ADDED',
        payload: response.data.recipe
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
}

export function signOutUser() {
  return async (dispatch) => {

    localStorage.removeItem(authUser);

    dispatch({
      type: 'SIGN_OUT_USER'
    });

    return Promise.resolve();
  };
}


export function signUpUser({ firstname, lastname, email, username, password }) {
  return async (dispatch, getState) => {

    try {
      const response = await axios.post(`http://localhost:4044/api/v1/users/signup`, {
        firstname, lastname, email, username, password
      });
      localStorage.setItem('authUser', JSON.stringify(response.data));


      return;

      dispatch({
        type: 'SIGN_IN_USER',
        authUser: response.data
      });

      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
  };
}

export function getRecipe(recipeId) {
  return async (dispatch, getState) => {

    try {
      const response = await axios.get(`http://localhost:4044/api/v1/recipes/${recipeId}`);
      console.log(response);
      dispatch({
        type: 'NEW_RECIPE_ADDED',
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
      const response = await axios.post(`http://localhost:4044/api/v1/reviews/${recipeId}`, { review });
      dispatch({
        type: 'ADD_RECIPE_REVIEW',
        payload: response.data.review
      });
      dispatch({
        type: 'NOTIFICATION',
        payload: {
          level: 'SUCCESS',
          message: 'Review created successfully.'
        }
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject();
    }
  };
}