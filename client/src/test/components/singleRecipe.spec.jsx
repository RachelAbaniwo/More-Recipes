import React from 'react';
import { mount } from 'enzyme';

import recipeMock from '../mockData/recipeMock';
import SingleRecipe from '../../components/SingleRecipe';

describe('The SingleRecipe component', () => {
  const props = {
    recipe: recipeMock
  };
  it('should mount without crashing', () => {
    expect(mount(<SingleRecipe {...props} />)).toMatchSnapshot();
  });
});
