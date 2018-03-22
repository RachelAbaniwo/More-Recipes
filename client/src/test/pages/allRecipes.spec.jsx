/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { mount } from 'enzyme';
import {
  AllRecipeScreen,
  mapStateToProps,
  mapDispatchToProps
} from '../../pages/AllRecipes';

describe('The AllRecipes page', () => {
  const props = {
    recipes: [{
      id: 1,
      name: 'fried chicken stew',
      ingredients: '',
      description: '',
      category: 'lunch',
      method: '',
      userId: 1,
      views: 20,
      favorites: 1,
      upvotes: 1,
      downvotes: 1,
      User: {
        id: 1,
        username: 'test_user'
      }
    }, {
      id: 2,
      name: 'chicken stew',
      ingredients: 'bread, milk',
      description: 'baked chicken stew',
      category: 'lunch',
      method: 'mix the fufu with the egg',
      userId: 2,
      views: 20,
      favorites: 1,
      upvotes: 1,
      downvotes: 1,
      User: {
        id: 2,
        username: 'test_user_2'
      }
    }],
    searchQuery: 'search-string',
    updateSearchQuery: jest.fn(),
    updateSortQuery: jest.fn(),
    /**
     * @returns {Promise} promise
     */
    getAllRecipes() {
      return Promise.resolve();
    },
    pageData: {
      page: 1,
      pageCount: 7
    }
  };

  const nextPageProps = {
    ...props,
    recipes: [...props.recipes, {
      id: 3,
      name: 'chicken',
      ingredients: 'chicken',
      description: 'bake chicken stew',
      category: 'lunch',
      method: 'roast chicken',
      userId: 2,
      views: 20,
      favorites: 1,
      upvotes: 1,
      downvotes: 1,
      User: {
        id: 2,
        username: 'test_user_2'
      }
    }]
  };
  it('should mount without crashing', (done) => {
    const wrapper = mount(<AllRecipeScreen {...props} />);
    props.getAllRecipes().then(() => {
      expect(wrapper.state('loading')).toBe(false);
      done();
    });
  });
  it('should get more recipes when the next page is clicked', (done) => {
    const wrapper = mount(<AllRecipeScreen {...nextPageProps} />);

    wrapper.instance().getMoreRecipes({ selected: 1 });
    expect(wrapper.state().page).toBe(1);
    expect(wrapper.state().loading).toBe(true);
    props.getAllRecipes().then(() => {
      setTimeout(() => {
        expect(wrapper.state('loading')).toBe(false);
        done();
      }, 500);
    });
  });

  it('should call updateSearchQuery if input search box changes', () => {
    const wrapper = mount(<AllRecipeScreen {...props} />);

    wrapper.find('input').simulate('change', {
      target: { value: 'chicken' }
    });

    expect(props.updateSearchQuery).toHaveBeenCalledWith('chicken');
  });
  it('should call updateSortQuery if sort select box changes', () => {
    const wrapper = mount(<AllRecipeScreen {...props} />);

    wrapper.find('select[name="sort"]').simulate('change', {
      target: { value: 'upvotes' }
    });

    expect(props.updateSortQuery).toHaveBeenCalledWith('upvotes');
  });
  it('should call handleChange if limit select box changes', () => {
    const wrapper = mount(<AllRecipeScreen {...props} />);

    wrapper.find('select[name="limit"]').simulate('change', {
      target: { value: 4, name: 'limit' }
    });

    expect(wrapper.state('limit')).toBe(4);
  });
  it('should call getAllRecipes when user clicks on search button', () => {
    const spy = jest.spyOn(props, 'getAllRecipes');
    const wrapper = mount(<AllRecipeScreen {...props} />);

    wrapper.find('button').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
  describe('The handleSubmit function', () => {
    const spy = jest.spyOn(props, 'getAllRecipes');
    const wrapper = mount(<AllRecipeScreen {...props} />);

    const fakeClickEvent = {
      /**
       * Prevent click default
       * @returns {void} null
       */
      preventDefault() {}
    };

    wrapper.instance().handleSubmit(fakeClickEvent);
    expect(spy).toHaveBeenCalled();
  });
});
describe('The allRecipes mapStateToProps', () => {
  it('should update the state with authUser, recipes, searchQuery, pageData, sort and page', () => {
    const state = {
      recipes: {
        rows: [
          {
            id: 1
          },
          {
            id: 2
          }
        ],
        pageData: {
          page: 1
        }
      },
      authUser: { user: {}, token: '' },
      search: {
        query: 'search'
      },
      sort: 'upvotes'

    };

    const componentProps = mapStateToProps(state);
    expect(componentProps.authUser).toEqual({ user: {}, token: '' });
    expect(componentProps.recipes).toEqual([{ id: 1 }, { id: 2 }]);
    expect(componentProps.searchQuery).toEqual('search');
    expect(componentProps.pageData).toEqual({ page: 1 });
    expect(componentProps.page).toEqual(1);
  });
});

describe('The AllRecipes page mapDispatchToProps function', () => {
  it('should return signOutUser, getAllRecipes, updateSearchQuery, updateSortQuery functions', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);


    expect(results.signOutUser).toBeTruthy();
    expect(typeof results.signOutUser).toBe('function');

    expect(results.getAllRecipes).toBeTruthy();
    expect(typeof results.getAllRecipes).toBe('function');

    expect(results.updateSearchQuery).toBeTruthy();
    expect(typeof results.updateSearchQuery).toBe('function');

    expect(results.updateSortQuery).toBeTruthy();
    expect(typeof results.updateSortQuery).toBe('function');
  });
});

