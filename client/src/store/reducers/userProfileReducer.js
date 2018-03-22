import { GET_MY_RECIPES, GET_MY_FAVORITES } from '../actions/userProfile';
import { SIGN_OUT_USER } from '../actions/user';

const initialState = {
  myRecipes: {
    rows: [],
    pageData: {}
  },
  favoriteRecipes: {
    rows: [],
    pageData: {}
  }
};
/**
 * My recipes reducer
 * @param {object} state default recipes state
 * @param {object} action action to be reduced
 * @returns {object} new state
 */
export default function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MY_RECIPES:
      return {
        ...state,
        myRecipes: {
          rows: [
            ...action.payload.myRecipes
          ],
          pageData: {}
        }
      };
    case GET_MY_FAVORITES:
      return {
        ...state,
        favoriteRecipes: {
          rows: [
            ...action.payload.favoriteRecipes
          ],
          pageData: {}
        }
      };
    case SIGN_OUT_USER:
      return initialState;
    default:
      return state;
  }
}
