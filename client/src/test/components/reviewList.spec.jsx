import React from 'react';
import { mount } from 'enzyme';
import ReviewList from '../../components/ReviewList';

describe('The ReviewsList component', () => {
  const props = {
    reviews: [{
      id: 1,
      review: 'some review',
      userId: 1,
      User: {
        id: 1,
        username: 'test_user'
      }
    }, {
      id: 2,
      review: '',
      userId: 1,
      User: {
        id: 1,
        username: 'test_user'
      }
    }]
  };
  it('should display a list of reviews passed to it', () => {
    const wrapper = mount(<ReviewList {...props} />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
