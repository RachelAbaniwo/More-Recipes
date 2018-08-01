import { UPDATE_SORT_QUERY } from './../actions/recipes';

/**
 *
 * @param {obj} state
 * @param {obj} action
 * @returns {obj} state
 */
export default function sortReducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_SORT_QUERY:
      return {
        sort: action.payload
      };
    default:
      return state;
  }
}
