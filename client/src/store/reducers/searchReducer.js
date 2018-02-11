/* eslint-disable */
import { UPDATE_SEARCH_STRING } from './../actions/recipes';

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