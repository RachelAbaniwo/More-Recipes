import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import { LoginScreen } from '../../pages/Login';

Enzyme.configure({ adapter: new Adapter() });

describe('The login component ', () => {
  const props = {
    signInUser() { },
    signOutUser() { },
    router: { push() { }, location: { pathname: '/signin' } }
  };
  it('should mount without crashing', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should set email on state when user types in email input', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    wrapper.find('input[name="email"]').simulate('change', { target: { value: 'test@user.com', name: 'email' } });
    expect(wrapper.state().email).toBe('test@user.com');
  });
  it('should set password on state when user types in password input', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'rachel', name: 'password' } });
    expect(wrapper.state().password).toBe('rachel');
  });
  it('should display validation errors if there are any', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Email is required', 'Password is required']);
    expect(wrapper
      .contains(<small className="mb-3 sm-error">Email is required</small>))
      .toBe(true);
    expect(wrapper
      .contains(<small className="mb-3 sm-error">Password is required</small>))
      .toBe(true);
  });
  it('should sign a user in if correct credentials are filled into email and password fields', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleSignIn');
    wrapper.find('input[name="email"]')
      .simulate('change', { target: { value: 'test@user.com', name: 'email' } });
    wrapper.find('input[name="password"]')
      .simulate('change', { target: { value: 'rachel', name: 'password' } });

    wrapper.find('input[type="submit"]').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
  it('Should set (and display )server error messages on state if sign in is unsuccessful', () => {
    const failedSignedInProps = {
      ...props,
      /**
       * Sign in user mock
       * @returns {promise} promise
       */
      signInUser() {
        const error = new Error();
        error.response = {
          status: 422,
          data: { message: 'Wrong credentials.' }
        };

        throw error;
      }
    };

    const wrapper = mount(<LoginScreen {...failedSignedInProps} />);

    wrapper.setState({
      email: 'test@user.com',
      password: 'rachel'
    });

    wrapper.find('input[type="submit"]').simulate('click');
    wrapper.update();
    console.log('@@@ state from wrapper: ', wrapper.state());
  });
});

