import React from 'react';
import { mount } from 'enzyme';
import Footer from './../../components/Footer';


describe('The footer component', () => {
  it('should render footer without the sticky-bottom class if footer is mounted on the homepage', () => {
    const isHomeScreen = {
      isHomeScreen: true
    };
    const wrapper = mount(<Footer {...isHomeScreen} />);
    expect(wrapper.find('.fixed-bottom').length).toBe(0);
  });
  it('should render footer with the sticky-bottom class if footer is mounted on all pages except the homepage', () => {
    const isNotHomeScreen = {
      isHomeScreen: false
    };
    const wrapper = mount(<Footer {...isNotHomeScreen} />);
    expect(wrapper.find('.fixed-bottom').length).toBe(1);
  });
});
