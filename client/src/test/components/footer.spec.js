import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './../../components/Footer.jsx';

describe('The footer component', () => {
  it('Should render without crashing', () => {
    const tree = renderer.create(<Footer/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
