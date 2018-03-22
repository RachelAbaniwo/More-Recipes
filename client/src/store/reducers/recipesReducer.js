import { GET_ALL_RECIPES, NEW_RECIPE_ADDED, ADD_RECIPE_REVIEW, UPDATE_RECIPE, DELETE_RECIPE } from '../actions/recipes';
import { TOGGLE_VOTE, TOGGLE_FAVORITES } from '../actions/votes';

/**
 * The recipes reducer
 * @param {object} state default recipes state
 * @param {object} action action to be reduced
 * @returns {object} new state
 */
export default function recipesReducer(state = {
  rows: [],
  pageData: {}
}, action) {
  switch (action.type) {
    case NEW_RECIPE_ADDED:
      return {
        ...state,
        rows: [
          action.payload
        ]
      };
    case UPDATE_RECIPE:
      return {
        ...state,
        rows: state.rows.filter(recipe => recipe.id !== action.payload.id)
      };
    case DELETE_RECIPE:
      return {
        ...state,
        rows: state.rows.filter(recipe => recipe.id !== action.payload)
      };
    case ADD_RECIPE_REVIEW:
      return {
        ...state,
        rows: state.rows.map((recipe) => {
          if (recipe.id !== action.payload.recipeId) {
            return recipe;
          }
          return {
            ...recipe,
            Reviews: [
              ...recipe.Reviews,
              action.payload
            ]
          };
        })
      };
    case GET_ALL_RECIPES:
      return {
        rows: [
          ...action.payload.recipes
        ],
        pageData: action.payload.pageData,
      };
    case TOGGLE_VOTE:
      return {
        ...state,
        rows: state.rows.map((recipe) => {
          if (recipe.id !== action.payload.recipeId) {
            return recipe;
          }
          return {
            ...recipe,
            upvotes: action.payload.upvotes,
            downvotes: action.payload.downvotes
          };
        })
      };
    case TOGGLE_FAVORITES:
      return {
        ...state,
        rows: state.rows.map((recipe) => {
          if (recipe.id !== action.payload.recipeId) {
            return recipe;
          }

          return {
            ...recipe,
            favorites: action.payload.favorites,
            Favorites: action.payload.newFavorite ? [
              ...recipe.Favorites,
              action.payload.newFavorite
            ] : recipe.Favorites.filter(favorite => favorite.userId !== action.payload.userId)
          };
        })
      };
    default:
      return state;
  }
}
