import React from 'react';
import renderer from 'react-test-renderer';

import IngredientList from './../../components/IngredientList';

describe('The ingredients list component', () => {
  it('should render without crashing', () => {
    const tree = renderer
      .create(<IngredientList ingredients="eggs,tomatoes,pepper," />).toJSON();
    const tree2 = renderer
      .create(<IngredientList ingredients="eggs,tomatoes,pepper" />).toJSON();
    expect(tree.children.length).toBe(3);
    expect(tree2.children.length).toBe(3);
    expect(tree).toMatchSnapshot();
  });
});
