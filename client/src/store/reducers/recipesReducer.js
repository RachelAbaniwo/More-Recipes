
/**
 * The recipes reducer
 * @param {array} state default recipes state
 * @param {obj} action action to be reduced
 * @returns {array} new state
 */
export default function recipesReducer(state = [], action) {
  switch (action.type) {
    case 'NEW_RECIPE_ADDED':
      return [
        ...state,
        action.payload
      ];
    case 'ADD_RECIPE_REVIEW':
      return state.map((recipe) => {
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
      });
    default:
      return state;
  }
}
