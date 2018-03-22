import React from 'react';
import { mount } from 'enzyme';
import { AddReview, mapDispatchToProps } from '../../components/AddReview';

describe('The AddReview Component', () => {
  const props = {
    recipeId: 1,
    createReview: jest.fn()
  };
  it('should mount without crashing', () => {
    const wrapper = mount(<AddReview {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should set review on state when user adds a review to a recipe', () => {
    const wrapper = mount(<AddReview {...props} />);
    wrapper.find('textarea').simulate('change', {
      target: { value: 'some review' }
    });
    expect(wrapper.state().review).toBe('some review');
  });
  it(
    'should create a review if user clicks on submit button after filling in a review',
    () => {
      const wrapper = mount(<AddReview {...props} />);
      const spy = jest.spyOn(wrapper.instance(), 'createReview');
      wrapper.setState({
        review: 'some review'
      });

      wrapper.find('button').simulate('click');
      expect(spy).toHaveBeenCalled();
    }
  );
});

describe('The AddReview mapStateToProps', () => {
  const dispatch = jest.fn();
  const results = mapDispatchToProps(dispatch);

  expect(results.createReview).toBeTruthy();
  expect(typeof results.createReview).toBe('function');
});
