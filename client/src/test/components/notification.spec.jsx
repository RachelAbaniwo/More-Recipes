import React from 'react';
import { mount } from 'enzyme';
import { Notification, mapStateToProps } from '../../components/Notification';

describe('The Notification component', () => {
  const props = {
    notification: {
      level: 'success',
      message: 'user registered.'
    }
  };
  it('Should mount without crashing', () => {
    expect(mount(<Notification {...props} />)).toMatchSnapshot();
    expect(mount(<Notification />)).toMatchSnapshot();
  });
});
describe('The Notification component mapStateToProps', () => {
  it('should return authUser object', () => {
    const state = {
      notification: {
        level: 'success',
        message: 'user registered.'
      },
      autthUser: {}
    };

    const componentProps = mapStateToProps(state);
    expect(componentProps).toEqual({ notification: state.notification });
  });
});
