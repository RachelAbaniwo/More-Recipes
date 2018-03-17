import React from 'react';
import { mount } from 'enzyme';
import { LandingTopButtons, CreateRecipeButton } from '../../components/LandingPageButtons';
import userMock from '../mockData/userMock';

describe('The LandingPageButtons component', () => {
  const authProps = {
    authUser: {
      user: userMock
    },
    signOutUser: jest.fn()
  };

  const unAuthProps = {
    authUser: null,
    signOutUser: jest.fn()
  };

  it(
    'should mount only sign in and sign out buttons on the home page if user is not authenticated',
    () => {
      const wrapper = mount(<LandingTopButtons {...unAuthProps} />);

      expect(wrapper.find('Link').length).toBe(2);
      expect(wrapper.find({ to: '/signin' }).length).toBe(1);
      expect(wrapper.find({ to: '/signup' }).length).toBe(1);
      expect(wrapper.find({ to: '/dashboard' }).length).toBe(0);
      expect(wrapper.find('button').length).toBe(0);
    }
  );
  it(
    'should mount only dashboard and create recipe buttons on the home page if user is authenticated',
    () => {
      const wrapper = mount(<LandingTopButtons {...authProps} />);

      expect(wrapper.find('Link').length).toBe(1);
      expect(wrapper.find({ to: '/signin' }).length).toBe(0);
      expect(wrapper.find({ to: '/signup' }).length).toBe(0);
      expect(wrapper.find({ to: '/dashboard' }).length).toBe(1);
      expect(wrapper.find('button').length).toBe(1);
    }
  );
});
describe('The CreateRecipeButton component', () => {
  const authProps = {
    authUser: {
      user: userMock
    },
    signOutUser: jest.fn()
  };

  const unAuthProps = {
    authUser: null,
    signOutUser: jest.fn()
  };
  it(
    'should mount an empty div on the home page if user is not authenticated',
    () => {
      const wrapper = mount(<CreateRecipeButton {...unAuthProps} />);

      expect(wrapper.contains(<div id="return" />)).toBe(true);
      expect(wrapper.find({ to: '/signin' }).length).toBe(0);
      expect(wrapper.find({ to: '/signup' }).length).toBe(0);
      expect(wrapper.find({ to: '/dashboard' }).length).toBe(0);
      expect(wrapper.find('button').length).toBe(0);
    }
  );
  it(
    'should mount an create recipe and view profile buttons on the home page if user is authenticated',
    () => {
      const wrapper = mount(<CreateRecipeButton {...authProps} />);

      expect(wrapper.contains(<div style={{ marginTop: 50 }} />)).toBe(false);
      expect(wrapper.find('Link').length).toBe(2);
      expect(wrapper.find({ to: '/signin' }).length).toBe(0);
      expect(wrapper.find({ to: '/signup' }).length).toBe(0);
      expect(wrapper.find({ to: '/recipes/create' }).length).toBe(1);
      expect(wrapper.find({ to: '/dashboard' }).length).toBe(1);
      expect(wrapper.find('button').length).toBe(0);
    }
  );
});
