import { UPDATE_SEARCH_STRING } from './../actions/recipes';
/**
 *
 * @param {obj} state
 * @param {obj} action
 * @returns {obj} state
 */
export default function searchReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_SEARCH_STRING:
      return {
        query: action.payload
      };
    default:
      return state;
  }
}
