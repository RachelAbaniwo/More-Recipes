import React from 'react';
import { mount } from 'enzyme';
import { Favorites, mapDispatchToProps } from '../../components/Favorites';
import userMock from '../mockData/userMock';

describe('The Favorites component', () => {
  const notSignedInprops = {
    hasFavorited: true,
    recipeId: 1,
    toggleFavorite: jest.fn()
  };

  const signedInprops = {
    hasFavorited: true,
    recipeId: 1,
    authUser: {
      user: userMock
    },
    toggleFavorite: jest.fn()
  };

  it(
    'should mount with appropriate color of favorite icon and should mount without crashing when a user is signed in',
    () => {
      const wrapper = mount(<Favorites {...signedInprops} />);
      expect(wrapper.find('.orange').length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    }
  );
  it(
    'should mount with appropriate color of favorite icon and should mount without crashing when a user is not signed in'
    , () => {
      const wrapper = mount(<Favorites {...notSignedInprops} />);
      expect(wrapper.find('.grey').length).toBe(1);
      expect(wrapper).toMatchSnapshot();
    }
  );
  it('should toggle favorites count if user clicks to favorite', () => {
    const wrapper = mount(<Favorites {...signedInprops} />);
    wrapper.find('i').simulate('click');
    expect(signedInprops.toggleFavorite).toHaveBeenCalledWith(1);
  });
});

describe('The Favorite mapDispatchToProps', () => {
  it('should return toggleFavorite action', () => {
    const dispatch = jest.fn();

    const results = mapDispatchToProps(dispatch);
    expect(results.toggleFavorite).toBeTruthy();
    expect(typeof results.toggleFavorite).toBe('function');
  });
});
