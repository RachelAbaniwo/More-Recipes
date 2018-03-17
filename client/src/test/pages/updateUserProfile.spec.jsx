/* eslint-disable react/jsx-closing-tag-location */
import React from 'react';
import moxios from 'moxios';
import { mount } from 'enzyme';
import { UpdateUserScreen, mapStateToProps, mapDispatchToProps } from '../../pages/UpdateUserProfile';
import userMock from '../mockData/userMock';

describe('The Update user profile component', () => {
  const props = {
    authUser: {
      user: {
        id: 3,
        username: 'signed in user',
        email: 'user@signedin.com',
        aboutMe: 'about me',
        profilePicture: 'profile.jpg',
      }
    },
    router: { push: jest.fn() },
    imageFile: { preview: 'image-link' },
    setImageUrl: jest.fn(),
    updateUserProfile: jest.fn()
  };

  const withoutUploadImageProps = {
    ...props, imageFile: null
  };

  const failedProps = {
    ...props
  };
  describe('The handleValidation function ', () => {
    it(
      'should set validation errors on state if wrong input is passed when updating user profile',
      () => {
        const wrapper = mount(<UpdateUserScreen {...failedProps} />);
        wrapper.find('input[name="username"]').simulate('change', {
          target: { value: '', name: 'username' }
        });
        wrapper.find('textarea[name="aboutMe"]').simulate('change', {
          target: { value: '     ', name: 'aboutMe' }
        });
        wrapper.find('input[name="email"]').simulate('change', {
          target: { value: '', name: 'email' }
        });

        wrapper.instance().handleValidation();
        expect(wrapper.state().errors).toEqual([
          'Email address is required',
          'Choose a preferred username',
          'fill in valid characters in the about-me field'
        ]);
      }
    );
  });
  describe('the handleChange function', () => {
    it('should set state when input changes', () => {
      const wrapper = mount(<UpdateUserScreen {...props} />);

      wrapper.find('input[name="username"]').simulate('change', {
        target: { value: 'username', name: 'username' }
      });
      wrapper.find('textarea[name="aboutMe"]').simulate('change', {
        target: { value: 'aboutMe', name: 'aboutMe' }
      });
      wrapper.find('input[name="email"]').simulate('change', {
        target: { value: 'email', name: 'email' }
      });

      expect(wrapper.state().username).toBe('username');
      expect(wrapper.state().aboutMe).toBe('aboutMe');
      expect(wrapper.state().email).toBe('email');
    });
  });
  describe('the updateRecipe function ', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());
    it('should upload image and update user profile if user uploaded a profile image', (done) => {
      const spy = jest.spyOn(props, 'updateUserProfile');
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: {
            secure_url: 'https://cloudinary.com/profile_image.jpg'
          }
        });
      });

      const wrapper = mount(<UpdateUserScreen {...props} />);

      wrapper.setState({
        username: userMock.username,
        email: userMock.email,
        aboutMe: userMock.aboutMe,
        imageUrl: userMock.profilePicture
      });
      wrapper.instance().updateUserProfile().then(() => {
        expect(spy).toHaveBeenCalledWith(wrapper.state(), props.authUser.user.id);
        done();
      });
    });
    it('should upload image and update user profile if user uploaded a profile image', (done) => {
      const spy = jest.spyOn(withoutUploadImageProps, 'updateUserProfile');
      localStorage
        .setItem('authUser', JSON.stringify({ user: {}, token: 'SOME TOKEN' }));

      const wrapper = mount(<UpdateUserScreen {...withoutUploadImageProps} />);
      wrapper.setState({
        username: userMock.username,
        email: userMock.email,
        aboutMe: userMock.aboutMe
      });
      wrapper.instance().updateUserProfile().then(() => {
        expect(spy).toHaveBeenCalledWith(wrapper.state(), props.authUser.user.id);
        done();
      });
    });
    it('should stop execution if there are validation errors', () => {
      const wrapper = mount(<UpdateUserScreen {...failedProps} />);
      wrapper.find('input[name="username"]').simulate('change', {
        target: { value: '', name: 'username' }
      });
      wrapper.find('textarea[name="aboutMe"]').simulate('change', {
        target: { value: '     ', name: 'aboutMe' }
      });
      wrapper.find('input[name="email"]').simulate('change', {
        target: { value: 'test.com', name: 'email' }
      });
      wrapper.instance().updateUserProfile();
      expect(wrapper.state().errors).toEqual([
        'Please enter a valid email address',
        'Choose a preferred username',
        'fill in valid characters in the about-me field'
      ]);
    });
  });
});
describe('The updateUserProfile page mapStateToProps function', () => {
  it('should update the authUser and imageFile state', () => {
    const state = {
      authUser: { user: {}, token: '' },
      imageUpload: {
        imageFile: {
          preview: 'image.jpg'
        }
      }

    };

    const componentProps = mapStateToProps(state);
    expect(componentProps.authUser).toEqual({ user: {}, token: '' });
    expect(componentProps.imageFile).toEqual({ preview: 'image.jpg' });
  });
});

describe('The updateUserProfile page mapDispatchToProps function', () => {
  it('should return signOutUser, setImageUrl, updateUserProfile functions', () => {
    const dispatch = jest.fn();
    const results = mapDispatchToProps(dispatch);


    expect(results.signOutUser).toBeTruthy();
    expect(typeof results.signOutUser).toBe('function');

    expect(results.setImageUrl).toBeTruthy();
    expect(typeof results.setImageUrl).toBe('function');

    expect(results.updateUserProfile).toBeTruthy();
    expect(typeof results.updateUserProfile).toBe('function');
  });
});

