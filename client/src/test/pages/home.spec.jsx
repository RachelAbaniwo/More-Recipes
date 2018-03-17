/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import { shallow, mount } from 'enzyme';
import {
  Home,
  mapStateToProps,
  mapDispatchToProps
} from '../../pages/Home';

describe('Home page', () => {
  const props = {
    authUser: {
      user: {
        id: 3,
        username: 'signed in user',
        email: 'user@signedin.com',
        aboutMe: 'about me',
        profilePicture: 'profile.jpg',
      }
    },
    signOutUser: jest.fn(),
    router: { push: jest.fn() },
    searchQuery: 'search-string',
    updateSearchQuery: jest.fn(),
    updateSortQuery: jest.fn(),
  };

  const unauthenticatedProps = {
    ...props,
    authUser: null
  };
  it('should mount without crashing when user is authenticated', (done) => {
    const wrapper = shallow(<Home {...props} />);
    expect(wrapper).toMatchSnapshot();
    done();
  });
  it('should mount without crashing when user is not authenticated', (done) => {
    const wrapper = shallow(<Home {...unauthenticatedProps} />);
    expect(wrapper).toMatchSnapshot();
    done();
  });
  it('should call updateSearchQuery if input search box changes', (done) => {
    const wrapper = mount(<Home {...props} />);

    wrapper.find('input').simulate('change', {
      target: { value: 'chicken' }
    });
    expect(props.updateSearchQuery).toHaveBeenCalledWith('chicken');
    done();
  });
  it('should call handleChange if search box input changes', () => {
    const wrapper = mount(<Home {...props} />);

    wrapper.find('input').simulate('change', {
      target: { value: 'chicken' }
    });

    expect(props.updateSearchQuery).toHaveBeenCalledWith('chicken');
  });
  describe('The handleSubmit function', () => {
    const wrapper = mount(<Home {...props} />);

    const fakeClickEvent = {
      /**
       * Prevent click default
       * @returns {void} null
       */
      preventDefault() {}
    };

    wrapper.instance().handleSubmit(fakeClickEvent);
    expect(props.router.push).toHaveBeenCalled();
  });
  it('should call updateSortQuery with favorites if the view-top-favorites box is clicked', () => {
    const wrapper = mount(<Home {...props} />);

    wrapper.find('a#top-favorites-link').simulate('click');

    expect(props.updateSortQuery).toHaveBeenCalledWith('favorites');
  });
  it('should call updateSortQuery with upvotes if the view-top-upvotes box is clicked', () => {
    const wrapper = mount(<Home {...props} />);

    wrapper.find('a#top-voted-link').simulate('click');

    expect(props.updateSortQuery).toHaveBeenCalledWith('upvotes');
  });
});
describe('The Home page mapStateToProps', () => {
  it('should update the state with authUser and searchQuery', () => {
    const state = {
      authUser: { user: {}, token: '' },
      search: {
        query: 'search'
      },
      sort: 'upvotes'

    };

    const componentProps = mapStateToProps(state);
    expect(componentProps.authUser).toEqual({ user: {}, token: '' });
    expect(componentProps.searchQuery).toEqual('search');
  });
});

describe('The AllRecipes page mapDispatchToProps function', () => {
  it('should return signOutUser, updateSearchQuery and updateSortQuery functions', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);


    expect(results.signOutUser).toBeTruthy();
    expect(typeof results.signOutUser).toBe('function');

    expect(results.updateSearchQuery).toBeTruthy();
    expect(typeof results.updateSearchQuery).toBe('function');

    expect(results.updateSortQuery).toBeTruthy();
    expect(typeof results.updateSortQuery).toBe('function');
  });
});
