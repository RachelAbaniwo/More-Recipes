import React from 'react';
import { mount, shallow } from 'enzyme';
import Search from '../../components/Search';
import userMock from '../mockData/userMock';
import { Navbar, mapDispatchToProps } from '../../components/Navbar';

describe('The Navbar component', () => {
  const unAuthenticatedUserPropsOnRecipesPage = {
    authUser: null,
    router: {
      location: {
        pathname: '/recipes'
      }
    },
    signOutUser: jest.fn()
  };
  const authenticatedUserPropsOnRecipesPage = {
    authUser: { user: userMock },
    router: {
      location: {
        pathname: '/recipes',
      },
      push: jest.fn()
    },
    signOutUser: jest.fn()
  };
  const searchBoxPropsOnSignInPage = {
    authUser: null,
    router: {
      location: {
        pathname: '/signin'
      }
    },
    signOutUser: jest.fn()
  };
  const searchBoxPropsOnSignUpPage = {
    authUser: null,
    router: {
      location: {
        pathname: '/signup'
      }
    },
    signOutUser: jest.fn()
  };
  it(
    'should show sign in and sign up links if user is not authenticated',
    () => {
      const wrapper = mount(<Navbar {...unAuthenticatedUserPropsOnRecipesPage} />);

      expect(wrapper.find('Link').length).toBe(3);
      expect(wrapper.find({ to: '/signin' }).length).toBe(1);
      expect(wrapper.find({ to: '/signup' }).length).toBe(1);
    }
  );
  it(
    'should not show sign in and sign up links if user is authenticated',
    () => {
      const wrapper = mount(<Navbar {...authenticatedUserPropsOnRecipesPage} />);

      expect(wrapper.find({ to: '/signin' }).length).toBe(0);
      expect(wrapper.find({ to: '/signup' }).length).toBe(0);
    }
  );
  it(
    'should show user dropdown when user is signed in',
    () => {
      const wrapper = mount(<Navbar {...authenticatedUserPropsOnRecipesPage} />);

      expect(wrapper.find('li.dropdown').length).toBe(1);
      expect(wrapper.find({ to: '/dashboard' }).length).toBe(1);
      expect(wrapper.find('button.dropdown-item').length).toBe(1);
      expect(wrapper.find({ to: '/recipes/create' }).length).toBe(1);
    }
  );
  it(
    'should call signOutUser prop when user clicks on logout button',
    () => {
      const wrapper = mount(<Navbar {...authenticatedUserPropsOnRecipesPage} />);

      const logoutButton = wrapper.find('button.dropdown-item');

      expect(logoutButton.length).toBe(1);
      logoutButton.simulate('click');
      expect(authenticatedUserPropsOnRecipesPage.signOutUser).toHaveBeenCalled();
    }
  );
  it(
    'should show search box on all pages except recipes page',
    () => {
      const wrapper = shallow(<Navbar {...searchBoxPropsOnSignInPage} />);

      expect(wrapper
        .contains(<Search router={searchBoxPropsOnSignInPage.router} />))
        .toBe(true);
      expect(wrapper.find({ to: '/signin' }).length).toBe(0);
    }
  );
  it(
    'should not show register link in sign up page',
    () => {
      const wrapper = shallow(<Navbar {...searchBoxPropsOnSignUpPage} />);

      expect(wrapper
        .contains(<Search router={searchBoxPropsOnSignUpPage.router} />))
        .toBe(true);
      expect(wrapper.find({ to: '/signup' }).length).toBe(0);
    }
  );
});

describe('The Navbar mapDispatchToProps', () => {
  it('should return updateSortQuery function', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);
    expect(results.updateSortQuery).toBeTruthy();
    expect(typeof results.updateSortQuery).toBe('function');
  });
});
