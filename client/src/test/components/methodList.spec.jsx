import React from 'react';
import { mount } from 'enzyme';
import { MethodList } from '../../components/MethodList';

describe('The MethodList component', () => {
  const method1 = 'Peel yam. Wash the peeled yam. Fry it.';
  const method2 = 'Peel yam. Wash the peeled yam. Fry it';
  it('should display method list if method prop is passed with a full stop at the end', () => {
    const wrapper = mount(<MethodList method={method1} />);
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper).toMatchSnapshot();
  });
  it('should display method list if method prop is passed with a full stop at the end', () => {
    const wrapper = mount(<MethodList method={method2} />);
    expect(wrapper.find('li').length).toBe(3);
    expect(wrapper).toMatchSnapshot();
  });
});
