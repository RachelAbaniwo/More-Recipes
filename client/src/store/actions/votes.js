import axios from 'axios';
import config from './../../config';
import setNotification from './notification';

export const TOGGLE_VOTE = 'TOGGLE_VOTE';
export const TOGGLE_FAVORITES = 'TOGGLE_FAVORITES';

/**
 * toggles vote
 * @function
 *
 * @param {number} recipeId
 * @param {string} voteType
 *
 * @returns {object} dispatch
 */
export function toggleVote(recipeId, voteType) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${config.apiUrl}/recipes/${recipeId}/${voteType}`);
      const { recipe, message } = response.data;

      dispatch({
        type: TOGGLE_VOTE,
        payload: { upvotes: recipe.upvotes, recipeId: recipe.id, downvotes: recipe.downvotes }
      });

      dispatch(setNotification('success', message));
    } catch (error) {
      if (error.response.data.message === 'Unauthenticated') {
        dispatch(setNotification('error', `Please signin to ${voteType} this recipe.`));
        return Promise.reject();
      }
      dispatch(setNotification('error', `You can't ${voteType} a recipe you created.`));
      return Promise.reject();
    }
  };
}

/**
 * toggles favorites
 * @function
 *
 * @param {number} recipeId
 *
 * @returns {object} dispatch
 */
export function toggleFavorite(recipeId) {
  return async (dispatch, getState) => {
    try {
      const response = await axios.post(`${config.apiUrl}/favorites/${recipeId}`);
      const { recipe, message } = response.data;

      dispatch({
        type: TOGGLE_FAVORITES,
        payload: {
          favorites: recipe.favorites,
          userId: getState().authUser.user.id,
          newFavorite: response.data.favorite,
          recipeId: recipe.id
        }
      });
      dispatch(setNotification('success', message));
    } catch (error) {
      if (error.response.data.message === 'Unauthenticated') {
        dispatch(setNotification('error', 'Please signin to favorite this recipe.'));
        return Promise.reject();
      }
      dispatch(setNotification('error', 'You can\'t favorite a recipe you created.'));
      return Promise.reject();
    }
  };
}
