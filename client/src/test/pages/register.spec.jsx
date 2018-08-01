import React from 'react';
import { setTimeout } from 'timers';
import { shallow, mount } from 'enzyme';
import { RegisterScreen, mapStateToProps, mapDispatchToProps } from '../../pages/Register';

describe('The Register component ', () => {
  const props = {
    signUpUser() {},
    router: { push() { }, location: { pathname: '/signup' } }
  };
  it('should mount without crashing', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should set name on state when user types in name input', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.find('input[name="name"]').simulate('change', { target: { value: 'rachel', name: 'name' } });
    expect(wrapper.state().name).toBe('rachel');
  });
  it('should set email on state when user types in email input', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.find('input[name="email"]').simulate('change', { target: { value: 'test@user.com', name: 'email' } });
    expect(wrapper.state().email).toBe('test@user.com');
  });
  it('should set password on state when user types in password input', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.find('input[name="password"]').simulate('change', { target: { value: 'rachel', name: 'password' } });
    expect(wrapper.state().password).toBe('rachel');
  });
  it('should display validation errors if name, email and password fields are empty', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Name is required!', 'Email Address is required!', 'Choose a password']);
  });
  it('should register a user if correct credentials are filled', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    const spy = jest.spyOn(wrapper.instance(), 'handleRegister');

    wrapper.setState({
      name: 'name',
      email: 'test@user.com',
      password: 'rachel'
    });

    wrapper.find('input[type="submit"]').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
  it('should display validation errors if wrong email format is filled', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.setState({
      name: 'name',
      email: 'test@user',
      password: 'rachel'
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Email format is wrong, enter valid email address']);
  });
  it('should display validation errors if the number of characters filled in the name field is less than 3', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.setState({
      name: 'na',
      email: 'test@user.com',
      password: 'rachel'
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Your name should have a minimum of 3 characters']);
  });
  it('should display validation errors if other characters besides alphabets are filled in the name field', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.setState({
      name: '          ',
      email: 'test@user.com',
      password: 'rachel'
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Name should include letters only']);
  });
  it('should display validation errors if wrong password format is filled', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.setState({
      name: 'name',
      email: 'test@user.com',
      password: '&&&&&&'
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Password should only include ( letters, numbers, -, _, and . )']);
  });
  it('should display validation errors if password length is less than 6', () => {
    const wrapper = shallow(<RegisterScreen {...props} />);
    wrapper.setState({
      name: 'name',
      email: 'test@user.com',
      password: 'me'
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Your password should have a minimum of 6 characters']);
  });
  it('Should set (and display) error messages from server-side on state if registration is unsuccessful', () => {
    const failedRegisterProps = {
      ...props,
      /**
       * Sign up user mock
       * @returns {promise} promise
       */
      signUpUser() {
        const error = new Error();
        error.response = {
          status: 400,
          data: { message: 'Validation errors' }
        };

        throw error;
      }
    };

    const wrapper = mount(<RegisterScreen {...failedRegisterProps} />);

    wrapper.setState({
      name: 'name',
      email: 'test@user.com',
      password: 'rachel'
    });

    wrapper.find('input[type="submit"]').simulate('click');

    setTimeout(() => {
      expect(wrapper.state().errors).toEqual(['Validation errors']);
    }, 50);
  });

  it('Should set (and display) error messages from server-side on state if registration is unsuccessful', () => {
    const failedRegisterProps = {
      ...props,
      /**
       * Sign up user mock
       * @returns {promise} promise
       */
      signUpUser() {
        const error = new Error();
        error.response = {
          status: 500
        };

        throw error;
      }
    };

    const wrapper = mount(<RegisterScreen {...failedRegisterProps} />);

    wrapper.setState({
      name: 'name',
      email: 'test@user.com',
      password: 'rachel'
    });

    wrapper.find('input[type="submit"]').simulate('click');
    setTimeout(() => {
      expect(wrapper.state().errors).toEqual(['Something went wrong. Please try again later.']);
    }, 50);
  });
});

describe('The Register component mapStateToProps', () => {
  it('should return authUser object', () => {
    const state = {
      authUser: { user: {}, token: '' }
    };

    const componentProps = mapStateToProps(state);
    expect(componentProps).toEqual({ authUser: { user: {}, token: '' } });
  });
});

describe('The Register component mapDispatchToProps', () => {
  it('should return signInUser function', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);
    expect(results.signUpUser).toBeTruthy();
    expect(typeof results.signUpUser).toBe('function');
  });
});
