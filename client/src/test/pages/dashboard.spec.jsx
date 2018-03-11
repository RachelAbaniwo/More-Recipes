import React from 'react';
import { shallow, mount } from 'enzyme';
import { ViewDashboard, mapStateToProps, mapDispatchToProps } from
  '../../pages/ViewDashboard';

import userMock from '../mockData/userMock';
import recipeMock from '../mockData/recipeMock';

describe('The ViewDasboard component', () => {
  const props = {
    favoriteRecipes: [recipeMock],
    myRecipes: [recipeMock],
    getMyFavorites: jest.fn(),
    getMyRecipes: jest.fn(),
    authUser: {
      user: userMock
    }
  };

  it('should mount without crashing', () => {
    const wrapper = shallow(<ViewDashboard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should fetch myRecipes and myFavorites when component is mounted', () => {
    mount(<ViewDashboard {...props} />);
    expect(props.getMyFavorites).toHaveBeenCalled();
    expect(props.getMyRecipes).toHaveBeenCalled();
  });
});

describe('The ViewDasboard mapStateToProps', () => {
  it('should return authUser, myRecipes, favoriteRecipes props ', () => {
    const fakeStore = {
      authUser: {
        user: userMock
      },
      userProfile: {
        myRecipes: {
          rows: [recipeMock]
        },
        favoriteRecipes: {
          rows: [recipeMock]
        }
      },
    };

    const props = mapStateToProps(fakeStore);
    expect(props.authUser).toBe(fakeStore.authUser);
    expect(props.myRecipes).toBe(fakeStore.userProfile.myRecipes.rows);
    expect(props.favoriteRecipes).toBe(fakeStore.userProfile.favoriteRecipes.rows);
  });
});

describe('The ViewDasboard mapDispatchToProps', () => {
  it('should return getMyRecipes and getMyFavorites actions', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);
    expect(results.getMyRecipes).toBeTruthy();
    expect(typeof results.getMyRecipes).toBe('function');
    expect(results.getMyFavorites).toBeTruthy();
    expect(typeof results.getMyFavorites).toBe('function');
  });
});

