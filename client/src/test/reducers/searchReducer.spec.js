import searchReducer from '../../store/reducers/searchReducer';
import { UPDATE_SEARCH_STRING } from '../../store/actions/recipes';

describe('the searchReducer', () => {
  it('should return initial state when the redux store initializes', () => {
    const initialState = {};

    const action = {
      type: 'UNDEFINED_ACTION'
    };

    const result = searchReducer(undefined, action);
    expect(result).toEqual(initialState);
  });
  it('should maintain state if an invalid action is passed.', () => {
    const state = {
      query: 'search'
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };
    const result = searchReducer(state, action);
    expect(result).toEqual(state);
  });
  it('should update and return the query in the state when UPDATE_SEARCH_STRING is called', () => {
    const state = {
      search: { query: '' }
    };

    const newState = {
      query: 'search'
    };

    const action = {
      type: UPDATE_SEARCH_STRING,
      payload: 'search'
    };

    const result = searchReducer(state, action);
    expect(result).toEqual(newState);
  });
});
