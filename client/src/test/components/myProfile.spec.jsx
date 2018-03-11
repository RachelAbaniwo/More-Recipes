import React from 'react';
import { mount } from 'enzyme';
import MyProfile from '../../components/MyProfile';

import userMock from '../mockData/userMock';

describe('The MyProfile component', () => {
  const userWithAboutMe = {
    ...userMock,
  };
  const userWithNoAboutMe = {
    ...userMock,
    aboutMe: null
  };
  const userWithProfilePicture = {
    ...userMock
  };
  const userWithNoProfilePicture = {
    ...userMock,
    profilePicture: null
  };
  it('Should display user profile picture if there is', () => {
    const wrapper = mount(<MyProfile authUser={{ user: userWithProfilePicture }} />);
    expect(wrapper.find('img')
      .props().src).toBe(userWithProfilePicture.profilePicture);

    expect(wrapper).toMatchSnapshot();
  });
  it(
    'Should display default profile picture if there user has no picture',
    () => {
      const wrapper = mount(<MyProfile authUser={{ user: userWithNoProfilePicture }} />);
      expect(wrapper.find('img')
        .props().src).toBe('file-mock');
      expect(wrapper).toMatchSnapshot();
    }
  );
  it('should display about me text if user has about me in profile', () => {
    const wrapper = mount(<MyProfile authUser={{ user: userWithAboutMe }} />);
    // eslint-disable-next-line
    const aboutMe =
      (<p className="text-center"><strong>ABOUT ME</strong><br />{userWithAboutMe.aboutMe}</p>);
    expect(wrapper
      .contains(aboutMe)).toBe(true);
    expect(wrapper).toMatchSnapshot();
  });
  it('should not display any text if user has no about me in profile', () => {
    const wrapper = mount(<MyProfile authUser={{ user: userWithNoAboutMe }} />);
    // eslint-disable-next-line
    const aboutMe =
      (<p className="text-center"><strong>ABOUT ME</strong><br />{userWithAboutMe.aboutMe}</p>);
    expect(wrapper
      .contains(aboutMe)).toBe(false);
    expect(wrapper).toMatchSnapshot();
  });
});

