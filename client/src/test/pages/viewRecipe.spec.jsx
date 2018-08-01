import React from 'react';
import { shallow } from 'enzyme';
import {
  ViewRecipeScreen,
  mapStateToProps,
  mapDispatchToProps
} from '../../pages/ViewRecipe';

describe('The ViewRecipe Page', () => {
  const props = {
    recipe: {
      User: {
        id: 1,
        username: 'username'
      },
      Favorites: [
        {
          id: 1,
          userId: 2
        }
      ],
      id: 1,
      userId: 1,
      name: 'recipe name',
      description: 'recipe description',
      ingredients: 'recipe ingredients',
      method: 'recipe method',
      recipeImage: 'recipe.jpg'
    },
    params: {
      recipeId: '1'
    },
    getRecipe: jest.fn(),
    deleteRecipe: jest.fn(),
    authUser: {
      user: {
        id: 3,
        username: 'signed in user',
        email: 'user@signedin.com',
        aboutMe: 'about me',
        profilePicture: 'profile.jpg',
      }
    },
    router: {
      push: jest.fn(),
      location: {
        pathname: '/signin'
      }
    }
  };

  const propsWithNoRecipeFavorites = {
    ...props,
    recipe: {
      ...props.recipe,
      Favorites: null
    }
  };

  const propsWithNoRecipes = {
    ...props,
    recipe: null
  };

  const propsRecipeByUser = {
    ...props,
    authUser: {
      user: {
        ...props.authUser.user,
        id: 1
      }
    }
  };

  const propsWhenUserHasFavorited = {
    ...props,
    recipe: {
      ...props.recipe,
      Favorites: [{
        userId: 3,
        id: 1
      }]
    }
  };

  const propsWithNoAuthUser = {
    ...props,
    authUser: null
  };

  it('should mount without crashing when supplied props', () => {
    const wrapper = shallow(<ViewRecipeScreen {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should display a loading recipe text when recipe is not yet found', () => {
    const wrapper = shallow(<ViewRecipeScreen {...propsWithNoRecipes} />);
    expect(wrapper.contains(<h1>Loading the recipe...</h1>)).toBe(true);
  });
  it('should display update and delete recipe buttons when recipe is viewed by owner', () => {
    const wrapper = shallow(<ViewRecipeScreen {...propsRecipeByUser} />);
    expect(wrapper.find('ViewRecipesButtons').length).toBe(1);
  });
  describe('The hasFavorited function', () => {
    it('should return false if user has not favorited this recipe', () => {
      const wrapper = shallow(<ViewRecipeScreen {...props} />);

      expect(wrapper.instance().hasFavorited()).toBe(false);
    });
    it('should return true if user has favorited this recipe', () => {
      const wrapper = shallow(<ViewRecipeScreen {...propsWhenUserHasFavorited} />);

      expect(wrapper.instance().hasFavorited()).toBe(true);
    });
    it('should return false if user is not authenticated', () => {
      const wrapper = shallow(<ViewRecipeScreen {...propsWithNoAuthUser} />);

      expect(wrapper.instance().hasFavorited()).toBe(false);
    });
    it('should return false if reciep has no favorites', () => {
      const wrapper = shallow(<ViewRecipeScreen {...propsWithNoRecipeFavorites} />);

      expect(wrapper.instance().hasFavorited()).toBe(false);
    });
  });
  describe('The ViewRecipe page mapStateToProps function', () => {
    it('should return authUser recipe state when recipe is null', () => {
      const state = {
        recipes: {
          rows: [],
          pageData: {}
        },
        authUser: { user: {}, token: '' }

      };
      const ownProps = {
        params: {
          recipeId: 1
        }
      };

      const componentProps = mapStateToProps(state, ownProps);
      expect(componentProps.authUser).toEqual({ user: {}, token: '' });
      expect(componentProps.recipe).toEqual(null);
    });
    it('should return authUser recipe state when recipe is not null', () => {
      const state = {
        recipes: {
          rows: [
            {
              id: 1,
              name: 'name'
            }
          ],
          pageData: {}
        },
        authUser: { user: {}, token: '' }

      };
      const ownProps = {
        params: {
          recipeId: 1
        }
      };

      const componentProps = mapStateToProps(state, ownProps);
      expect(componentProps.authUser).toEqual({ user: {}, token: '' });
      expect(componentProps.recipe).toEqual({ id: 1, name: 'name' });
    });
  });
  describe('The ViewRecipe page mapDispatchToProps function', () => {
    it('should return signOutUser, getRecipe, deleteRecipe functions', () => {
      const dispatch = jest.fn();
      const results = mapDispatchToProps(dispatch);

      expect(results.signOutUser).toBeTruthy();
      expect(typeof results.signOutUser).toBe('function');

      expect(results.getRecipe).toBeTruthy();
      expect(typeof results.getRecipe).toBe('function');

      expect(results.deleteRecipe).toBeTruthy();
      expect(typeof results.deleteRecipe).toBe('function');
    });
  });
});
