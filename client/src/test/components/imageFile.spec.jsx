import React from 'react';
import { mount } from 'enzyme';
import { ImageFile } from '../../components/ImageFile';

describe('The ImageFile component', () => {
  const updateProps = {
    setImageUrl: jest.fn(),
    imageFile: {
      preview: 'image.jpg'
    },
    imageUrl: 'https//image.jpg'
  };

  const createProps = {
    setImageUrl: jest.fn(),
    imageFile: null,
    imageUrl: null
  };

  const createPropsWithImagePreview = {
    setImageUrl: jest.fn(),
    imageFile: {
      preview: 'image.jpg'
    },
    imageUrl: null
  };

  const updatePropsWithImageUrl = {
    setImageUrl: jest.fn(),
    imageFile: null,
    imageUrl: 'https//image.jpg'
  };
  it('should mount without crashing when an image is being added', () => {
    const wrapper = mount(<ImageFile {...createProps} />);
    expect(wrapper.find('h5.justify-content-center').length).toBe(1);
  });
  it('should mount without crashing when an image is being updated', () => {
    const wrapper = mount(<ImageFile {...updateProps} />);
    expect(wrapper.find('div.overlay').length).toBe(1);
  });
  it(
    'should mount image with src as image preview if image is being created',
    () => {
      const wrapper = mount(<ImageFile {...createPropsWithImagePreview} />);

      expect(wrapper.find('img').props().src)
        .toBe(createPropsWithImagePreview.imageFile.preview);
    }
  );
  it(
    'should mount image with src as image url if image is being updated',
    () => {
      const wrapper = mount(<ImageFile {...updatePropsWithImageUrl} />);

      expect(wrapper.find('img').props().src)
        .toBe(updatePropsWithImageUrl.imageUrl);
    }
  );
  it('should call handleDrop when user uploads an image', () => {
    const wrapper = mount(<ImageFile {...createProps} />);

    wrapper.find('input[type="file"]').simulate('change', {
      target: {
        files: [{ preview: 'some_preview_url' }]
      }
    });
    expect(createProps.setImageUrl).toHaveBeenCalled();
  });
});
