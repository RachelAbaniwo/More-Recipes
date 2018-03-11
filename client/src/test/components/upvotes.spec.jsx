import React from 'react';
import { mount } from 'enzyme';
import { Upvotes, mapDispatchToProps } from '../../components/Upvotes';

describe('The Upvote component', () => {
  const props = {
    upvotes: 1,
    recipeId: 1,
    toggleVote: jest.fn()
  };

  it('should mount without crashing', () => {
    const wrapper = mount(<Upvotes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should toggle vote count if user clicks to upvote', () => {
    const wrapper = mount(<Upvotes {...props} />);
    wrapper.find('i').simulate('click');
    expect(props.toggleVote).toHaveBeenCalledWith(1, 'upvote');
  });
});

describe('The Downvote mapDispatchToProps', () => {
  it('should return toggleVote action', () => {
    const dispatch = jest.fn();

    const results = mapDispatchToProps(dispatch);
    expect(results.toggleVote).toBeTruthy();
    expect(typeof results.toggleVote).toBe('function');
  });
});
