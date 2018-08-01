import React from 'react';
import { mount } from 'enzyme';
import { Search, mapStateToProps, mapDispatchToProps } from '../../components/Search';

describe('The Search component', () => {
  const props = {
    router: {
      location: { pathname: '/' },
      push: jest.fn(),
    },
    updateSearchQuery: jest.fn(),
    searchQuery: ''
  };
  it('should mount without crashing', () => {
    const wrapper = mount(<Search {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should call push on search form submit', () => {
    const wrapper = mount(<Search {...props} />);
    wrapper.find('form').simulate('submit');
    expect(props.router.push).toHaveBeenCalled();
  });
  it('should mount form if pathname is not /recipes', () => {
    const wrapper = mount(<Search {...props} />);
    expect(wrapper.find('form').length).toBe(1);
  });
  it('should not mount form if pathname is /recipes', () => {
    const notRecipesPathProps = {
      ...props,
      router: {
        ...props.router,
        location: { pathname: '/recipes' }
      }
    };
    const wrapper = mount(<Search {...notRecipesPathProps} />);
    expect(wrapper.find('form').length).toBe(0);
    expect(wrapper.find('div').length).toBe(1);
  });
  it('should call updateSearchQuery when input text changes', () => {
    const wrapper = mount(<Search {...props} />);
    wrapper.find('input').simulate('change', {
      target: { value: 'chicken' }
    });
    expect(props.updateSearchQuery).toHaveBeenCalled();
  });
});

describe('The updateSearchQuery mapStateToProps', () => {
  it('should return searchQuery', () => {
    const fakeStore = {
      search: {
        query: 'search term'
      }
    };

    const props = mapStateToProps(fakeStore);
    expect(props.searchQuery).toBe('search term');
  });
});

describe('The updateSearchQuery mapDispatchToProps', () => {
  it('should return updateSearchQuery action', () => {
    const dispatch = jest.fn();

    const results = mapDispatchToProps(dispatch);
    expect(results.updateSearchQuery).toBeTruthy();
    expect(typeof results.updateSearchQuery).toBe('function');
  });
});
