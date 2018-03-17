/* eslint-disable function-paren-newline */
import React from 'react';
import { mount } from 'enzyme';
import {
  PageNotFound
} from '../../pages/NotFound';

describe('The 404 Page', () => {
  it('should mount without crashing when user is authenticated', (done) => {
    const wrapper = mount(<PageNotFound />);
    expect(wrapper).toMatchSnapshot();
    done();
  });
  it('should display a \'page-not-found\' message on the screen', () => {
    const wrapper = mount(<PageNotFound />);
    expect(wrapper.contains(
      <h1
        className="text-center"
        id="page-not-found-title"
        style={{
        fontFamily: 'Berkshire Swash',
        color: 'lightGrey',
        fontSize: 150
      }}
      >404

      </h1>)).toBe(true);

    expect(wrapper.contains(
      <h3
        id="lost-your-way"
        style={{
          color: 'lightGrey'
          }}
      >
      Hey! it seems you lost your way
      </h3>)).toBe(true);

    expect(wrapper.contains(
      <h3
        style={{
          color: 'lightGrey'
          }}
      >
      Page not found
      </h3>)).toBe(true);
  });
});

