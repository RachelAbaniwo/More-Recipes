/* eslint-disable */
import axios from 'axios';
import config from './../../config';
import setNotification from './notification';

export const TOGGLE_VOTE = 'TOGGLE_VOTE';
export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

export function toggleVote(recipeId, voteType) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${config.apiUrl}/recipes/${recipeId}/${voteType}`);
      const { recipe, message } = response.data;

      dispatch({
        type: TOGGLE_VOTE,
        payload: { upvotes: recipe.upvotes, recipeId: recipe.id, downvotes: recipe.downvotes }
      });

      dispatch(setNotification('success', message));
    } catch (error) {
      if(error.response.data.message === 'Unauthenticated') {
        dispatch(setNotification('error', `Please signin to ${voteType} this recipe.`)); 
      } else {
        dispatch(setNotification('error', `You can't ${voteType} a recipe you created.`)); 
      }
    }
  }
}

export function toggleFavorite(recipeId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${config.apiUrl}/favorites/${recipeId}`);
      const{ recipe, message } = response.data;

      dispatch({
        type: TOGGLE_FAVORITES,
        payload: { favorites: recipe.favorites, recipeId: recipe.id }
      });
      dispatch(setNotification('success', message));
    } catch (error) {
      if(error.response.data.message === 'Unauthenticated') {
        dispatch(setNotification('error', `Please signin to favorite this recipe.`));
      } else {
        dispatch(setNotification('error', `You can't favorite a recipe you created.`));
      }
    }
  }
}