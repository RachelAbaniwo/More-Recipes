import React from 'react';
import { mount } from 'enzyme';
import { Downvotes, mapDispatchToProps } from '../../components/Downvotes';

describe('The Downvote component', () => {
  const props = {
    downvotes: 1,
    recipeId: 1,
    toggleVote: jest.fn()
  };

  it('should mount without crashing', () => {
    const wrapper = mount(<Downvotes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should toggle vote count if user clicks to downvote', () => {
    const wrapper = mount(<Downvotes {...props} />);
    wrapper.find('i').simulate('click');
    expect(props.toggleVote).toHaveBeenCalledWith(1, 'downvote');
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
