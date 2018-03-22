import sortReducer from '../../store/reducers/sortReducer';
import { UPDATE_SORT_QUERY } from '../../store/actions/recipes';

describe('the searchReducer', () => {
  it('should return initial state when the redux store initializes', () => {
    const initialState = {};

    const action = {
      type: 'UNDEFINED_ACTION'
    };

    const result = sortReducer(undefined, action);
    expect(result).toEqual(initialState);
  });
  it('should maintain state if an invalid action is passed.', () => {
    const state = {
      sort: 'upvotes'
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };
    const result = sortReducer(state, action);
    expect(result).toEqual(state);
  });
  it('should update and return the query in the state when UPDATE_SORT_STRING is called', () => {
    const state = {
      sort: ''
    };

    const newState = {
      sort: 'upvotes'
    };

    const action = {
      type: UPDATE_SORT_QUERY,
      payload: 'upvotes'
    };

    const result = sortReducer(state, action);
    expect(result).toEqual(newState);
  });
});
