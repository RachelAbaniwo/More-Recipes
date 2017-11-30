
/**
 * The recipes reducer
 * @param {array} state default recipes state
 * @param {obj} action action to be reduced
 * @returns {array} new state
 */
export default function recipesReducer(state = [], action) {
  switch (action.type) {
    case 'NEW_RECIPE_ADDED':
      console.log('i am ahere', action);
      return state;
    default:
      return state;
  }
}