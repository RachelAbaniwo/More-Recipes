import { NEW_RECIPE_ADDED, DELETE_RECIPE, UPDATE_RECIPE, ADD_RECIPE_REVIEW, GET_ALL_RECIPES } from '../../store/actions/recipes';
import { TOGGLE_VOTE, TOGGLE_FAVORITES } from '../../store/actions/votes';
import recipesReducer from '../../store/reducers/recipesReducer';

describe('the RecipesReducer', () => {
  it('should return initial state when the redux store initializes', () => {
    const initialState = {
      rows: [],
      pageData: {}
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };

    const result = recipesReducer(undefined, action);
    expect(result).toEqual(initialState);
  });
  it('should maintain state if an invalid action is passed.', () => {
    const state = {
      rows: [{ id: 1, title: 'fried rice' }],
      pageData: { page: 1 }
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };
    expect(recipesReducer(state, action)).toEqual(state);
  });
  it('should return state with new recipe if NEW_RECIPE_ADDED is passed', () => {
    const state = {
      pageData: { pageCount: 2, page: 1 },
      rows: [{ id: 1, title: 'Chicken soup' }, { id: 2, title: 'Fried rice' }]
    };

    const newState = {
      pageData: { pageCount: 2, page: 1 },
      rows: [{ id: 3, title: 'FRIED BEANS' }]
    };

    const action = {
      type: NEW_RECIPE_ADDED,
      payload: { id: 3, title: 'FRIED BEANS' }
    };

    const result = recipesReducer(state, action);
    expect(result).toEqual(newState);
  });
  it('should return state with a specified updated recipes if UPDATE_RECIPE action is passed', () => {
    const state = {
      pageData: { pageCount: 2, page: 1 },
      rows: [{ id: 1, title: 'Chicken soup' }, { id: 2, title: 'Fried rice' }]
    };

    const action = {
      type: UPDATE_RECIPE,
      payload: { id: 2, title: 'Fried rice and chicken salad' }
    };

    const newState = {
      pageData: { pageCount: 2, page: 1 },
      rows: [{ id: 1, title: 'Chicken soup' }]
    };

    const result = recipesReducer(state, action);
    expect(result).toEqual(newState);
  });
  it('should return state without deleted recipe if DELETE_RECIPE action is passed', () => {
    const state = {
      pageData: { pageCount: 2, page: 1 },
      rows: [{ id: 1, title: 'Chicken soup' }, { id: 2, title: 'Fried rice' }]
    };

    const action = {
      type: DELETE_RECIPE,
      payload: 2
    };

    const newState = {
      pageData: { pageCount: 2, page: 1 },
      rows: [{ id: 1, title: 'Chicken soup' }]
    };

    expect(recipesReducer(state, action)).toEqual(newState);
  });
  it('should return state with a recipe review added if ADD_RECIPE_REVIEW action is passed', () => {
    const state = {
      pageData: { pageCount: 2, page: 1 },
      rows:
        [
          {
            id: 1,
            title: 'Chicken soup',
            Reviews: [{ id: 1, recipeId: 1, review: 'Awesome Recipe' }]
          },
          { id: 2, title: 'Fried rice', Reviews: [] }
        ]
    };

    const action = {
      type: ADD_RECIPE_REVIEW,
      payload: { id: 2, recipeId: 2, review: 'Very Easy to cook' }
    };

    const newState = {
      pageData: { pageCount: 2, page: 1 },
      rows:
        [
          {
            id: 1,
            title: 'Chicken soup',
            Reviews: [{ id: 1, recipeId: 1, review: 'Awesome Recipe' }]
          },
          {
            id: 2,
            title: 'Fried rice',
            Reviews: [{ id: 2, recipeId: 2, review: 'Very Easy to cook' }]
          }
        ]
    };
    expect(recipesReducer(state, action)).toEqual(newState);
  });
  it('should return state with all recipes added if GET_ALL_RECIPES action is passed', () => {
    const state = { pageData: {}, rows: [] };

    const action = {
      type: GET_ALL_RECIPES,
      payload: {
        recipes: [
          { id: 1, title: 'Chicken Soup' },
          { id: 2, title: 'Cheesy Burger' }
        ],
        pageData: { pageCount: 2, page: 1 }
      }
    };

    const newState = {
      rows: [
        { id: 1, title: 'Chicken Soup' },
        { id: 2, title: 'Cheesy Burger' }
      ],
      pageData: { pageCount: 2, page: 1 }
    };

    expect(recipesReducer(state, action)).toEqual(newState);
  });
  it('should return state with updated votes count if TOGGLE_VOTE action is passed', () => {
    const state = {
      pageData: { pageCount: 2, page: 1 },
      rows:
        [
          {
            id: 1,
            title: 'Chicken soup',
            upvotes: 2,
            downvotes: 3
          },
          {
            id: 2,
            title: 'Fried rice',
            upvotes: 1,
            downvotes: 2
          }
        ]
    };

    const action = {
      type: TOGGLE_VOTE,
      payload: {
        recipeId: 1,
        upvotes: 3,
        downvotes: 2
      }
    };

    const newState = {
      pageData: { pageCount: 2, page: 1 },
      rows:
        [
          {
            id: 1,
            title: 'Chicken soup',
            upvotes: 3,
            downvotes: 2
          },
          {
            id: 2,
            title: 'Fried rice',
            upvotes: 1,
            downvotes: 2
          }
        ]
    };

    expect(recipesReducer(state, action)).toEqual(newState);
  });
  describe('The recipesReducer called with TOGGLE_FAVORITES action', () => {
    it('should add favorite to recipe if the user has not favorited before', () => {
      const state = {
        pageData: { pageCount: 2, page: 1 },
        rows:
          [
            {
              id: 1,
              title: 'Chicken soup',
              upvotes: 2,
              downvotes: 3,
              favorites: 2,
              Favorites: [{ userId: 1, recipeId: 1 }]
            },
            {
              id: 2,
              title: 'Fried rice',
              upvotes: 1,
              downvotes: 2,
              favorites: 21,
              Favorites: [{ userId: 11, recipeId: 2 }]
            }
          ]
      };

      const action = {
        type: TOGGLE_FAVORITES,
        payload: {
          favorites: 3,
          newFavorite: { userId: 3, recipeId: 1 },
          recipeId: 1,
          userId: 23
        }
      };

      const newState = {
        pageData: { pageCount: 2, page: 1 },
        rows:
          [
            {
              id: 1,
              title: 'Chicken soup',
              upvotes: 2,
              downvotes: 3,
              favorites: 3,
              Favorites: [{ userId: 1, recipeId: 1 }, { userId: 3, recipeId: 1 }]
            },
            {
              id: 2,
              title: 'Fried rice',
              upvotes: 1,
              downvotes: 2,
              favorites: 21,
              Favorites: [{ userId: 11, recipeId: 2 }]
            }
          ]
      };

      expect(recipesReducer(state, action)).toEqual(newState);
    });
    it('should remove user favorite from recipe if the user has favorited before', () => {
      const state = {
        pageData: { pageCount: 2, page: 1 },
        rows:
          [
            {
              id: 1,
              title: 'Chicken soup',
              upvotes: 2,
              downvotes: 3,
              favorites: 2,
              Favorites: [{ userId: 1, recipeId: 1 }]
            },
            {
              id: 2,
              title: 'Fried rice',
              upvotes: 1,
              downvotes: 2,
              favorites: 21,
              Favorites: [{ userId: 11, recipeId: 2 }]
            }
          ]
      };

      const action = {
        type: TOGGLE_FAVORITES,
        payload: {
          favorites: 1,
          newFavorite: null,
          recipeId: 1,
          userId: 1
        }
      };

      const newState = {
        pageData: { pageCount: 2, page: 1 },
        rows:
          [
            {
              id: 1,
              title: 'Chicken soup',
              upvotes: 2,
              downvotes: 3,
              favorites: 1,
              Favorites: []
            },
            {
              id: 2,
              title: 'Fried rice',
              upvotes: 1,
              downvotes: 2,
              favorites: 21,
              Favorites: [{ userId: 11, recipeId: 2 }]
            }
          ]
      };

      expect(recipesReducer(state, action)).toEqual(newState);
    });
  });
});

