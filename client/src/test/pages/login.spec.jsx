import React from 'react';
import { setTimeout } from 'timers';
import { shallow, mount } from 'enzyme';
import { LoginScreen, mapStateToProps, mapDispatchToProps } from '../../pages/Login';

describe('The login component ', () => {
  const props = {
    signInUser() {},
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
  it('should display validation errors if email and password fields are empty', () => {
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

    wrapper.setState({
      email: 'test@user.com',
      password: 'rachel'
    });

    wrapper.find('input[type="submit"]').simulate('click');

    expect(spy).toHaveBeenCalled();
  });
  it('should display validation errors if wrong email format is filled', () => {
    const wrapper = shallow(<LoginScreen {...props} />);
    wrapper.setState({
      email: 'test@user',
      password: 'rachel'
    });
    wrapper.find('input[type="submit"]').simulate('click');
    expect(wrapper.state().errors).toEqual(['Email format is wrong, enter valid email address']);
    const error =
      (
        <small className="mb-3 sm-error">
        Email format is wrong, enter valid email address
        </small>
      );
    expect(wrapper
      .contains(error))
      .toBe(true);
  });
  it('Should set (and display) error messages from client-side on state if sign in is unsuccessful', () => {
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

    setTimeout(() => {
      expect(wrapper.state().errors).toEqual(['Wrong credentials.']);
    }, 50);
  });

  it('Should set (and display) error messages from server-side on state if sign in is unsuccessful', () => {
    const failedSignedInProps = {
      ...props,
      /**
       * Sign in user mock
       * @returns {promise} promise
       */
      signInUser() {
        const error = new Error();
        error.response = {
          status: 400,
          data: { errors: 'Wrong email format' }
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
    // TODO: FIND OUT WHY TIMEOUT HAS TO BE USED, AND IF YES, WHY IMPORTED.
    setTimeout(() => {
      expect(wrapper.state().errors).toEqual(['Wrong email format']);
    }, 50);
  });

  it('Should set (and display) error messages from server-side on state if sign in is unsuccessful', () => {
    const failedSignedInProps = {
      ...props,
      /**
       * Sign in user mock
       * @returns {promise} promise
       */
      signInUser() {
        const error = new Error();
        error.response = {
          status: 500
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
    setTimeout(() => {
      expect(wrapper.state().errors).toEqual(['Something went wrong. Please try again later.']);
    }, 50);
  });
});

describe('The login component mapStateToProps', () => {
  it('should return authUser object', () => {
    const state = {
      recipes: [],
      authUser: { user: {}, token: '' }
    };

    const componentProps = mapStateToProps(state);
    expect(componentProps).toEqual({ authUser: { user: {}, token: '' } });
  });
});

describe('The login component mapDispatchToProps', () => {
  it('should return signInUser function', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);
    expect(results.signInUser).toBeTruthy();
    expect(typeof results.signInUser).toBe('function');
  });
});
