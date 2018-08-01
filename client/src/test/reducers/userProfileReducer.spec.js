import userProfileReducer from '../../store/reducers/userProfileReducer';
import { GET_MY_RECIPES, GET_MY_FAVORITES } from '../../store/actions/userProfile';
import { SIGN_OUT_USER } from '../../store/actions/user';

describe('the userProfileReducer', () => {
  it('should return initial state when the redux store initializes', () => {
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

    const action = {
      type: 'UNDEFINED_ACTION'
    };

    const result = userProfileReducer(undefined, action);
    expect(result).toEqual(initialState);
  });
  it('should maintain state if an invalid action is passed.', () => {
    const state = {
      myRecipes: {
        rows: [
          { id: 1, title: 'Chicken soup' },
          { id: 2, title: 'Fried rice' },
          { id: 3, title: 'FRIED BEANS' }
        ],
        pageData: {}
      },
      favoriteRecipes: {
        rows: [
          { id: 4, title: 'Burgers' },
          { id: 5, title: 'Pancakes' },
          { id: 6, title: 'Smoked Chicken' }
        ],
        pageData: {}
      }
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };
    const result = userProfileReducer(state, action);
    expect(result).toEqual(state);
  });
  it('should update and return state with a user\'s recipes when GET_MY_RECIPES is called', () => {
    const state = {
      myRecipes: {
        rows: [],
        pageData: {}
      },
      favoriteRecipes: {
        rows: [],
        pageData: {}
      }
    };

    const newState = {
      myRecipes: {
        rows: [
          { id: 1, title: 'Chicken soup' },
          { id: 2, title: 'Fried rice' },
          { id: 3, title: 'FRIED BEANS' }
        ],
        pageData: {}
      },
      favoriteRecipes: {
        rows: [],
        pageData: {}
      }
    };

    const action = {
      type: GET_MY_RECIPES,
      payload: {
        myRecipes: [
          { id: 1, title: 'Chicken soup' },
          { id: 2, title: 'Fried rice' },
          { id: 3, title: 'FRIED BEANS' }
        ]
      }
    };

    const result = userProfileReducer(state, action);
    expect(result).toEqual(newState);
  });
  it('should update and return state with a user\'s favorite recipes when GET_MY_FAVORITES is called', () => {
    const state = {
      myRecipes: {
        rows: [],
        pageData: {}
      },
      favoriteRecipes: {
        rows: [],
        pageData: {}
      }
    };

    const newState = {
      myRecipes: {
        rows: [],
        pageData: {}
      },
      favoriteRecipes: {
        rows: [
          { id: 1, title: 'Chicken soup' },
          { id: 2, title: 'Fried rice' },
          { id: 3, title: 'FRIED BEANS' }
        ],
        pageData: {}
      },
    };

    const action = {
      type: GET_MY_FAVORITES,
      payload: {
        favoriteRecipes: [
          { id: 1, title: 'Chicken soup' },
          { id: 2, title: 'Fried rice' },
          { id: 3, title: 'FRIED BEANS' }
        ]
      }
    };

    const result = userProfileReducer(state, action);
    expect(result).toEqual(newState);
  });
  it('should update and return empty state when SIGN_OUT_USER is called', () => {
    const state = {
      myRecipes: {
        rows: [
          { id: 1, title: 'Chicken soup' },
          { id: 2, title: 'Fried rice' },
          { id: 3, title: 'FRIED BEANS' }
        ],
        pageData: {}
      },
      favoriteRecipes: {
        rows: [
          { id: 4, title: 'Burgers' },
          { id: 5, title: 'Pancakes' },
          { id: 6, title: 'Smoked Chicken' }
        ],
        pageData: {}
      }
    };

    const newState = {
      myRecipes: {
        rows: [],
        pageData: {}
      },
      favoriteRecipes: {
        rows: [],
        pageData: {}
      }
    };

    const action = {
      type: SIGN_OUT_USER,
    };

    const result = userProfileReducer(state, action);
    expect(result).toEqual(newState);
  });
});
