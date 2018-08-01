import React from 'react';
import { shallow } from 'enzyme';
import recipeMock from '../mockData/recipeMock';
import MySingleRecipe from '../../components/MySingleRecipe';


describe('The MySingleRecipe component', () => {
  it('should mount without crashing', () => {
    const wrapper = shallow(<MySingleRecipe recipe={recipeMock} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').length).toBe(1);
  });
});
