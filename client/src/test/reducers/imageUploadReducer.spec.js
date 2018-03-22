import imageUploadReducer from '../../store/reducers/imageUploadReducer';
import { SET_IMAGE_FILE, CLEAR_IMAGE_FILE } from '../../store/actions/recipes';

describe('the ImageUploadReducer', () => {
  it('should return initial state when the redux store initializes', () => {
    const initialState = {
      imageUpload: { imageFile: null }
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };

    const result = imageUploadReducer(undefined, action);
    expect(result).toEqual(initialState);
  });
  it('should maintain state if an invalid action is passed.', () => {
    const state = {
      imageFile: { preview: 'picture.jpg' }
    };

    const action = {
      type: 'UNDEFINED_ACTION'
    };
    const result = imageUploadReducer(state, action);
    expect(result).toEqual(state);
  });
  it('should return state with uploaded image if SET_IMAGE_FILE is called', () => {
    const state = {
      imageUpload: { imageFile: null }
    };

    const newState = {
      imageFile: { preview: 'picture.jpg' }
    };

    const action = {
      type: SET_IMAGE_FILE,
      payload: { preview: 'picture.jpg' }
    };

    const result = imageUploadReducer(state, action);
    expect(result).toEqual(newState);
  });
  it('should clear uplaoded image from state and return empty state if CLEAR_IMAGE_FILE is called', () => {
    const state = {
      imageFile: { preview: 'picture.jpg' }
    };

    const newState = {};

    const action = {
      type: CLEAR_IMAGE_FILE
    };

    const result = imageUploadReducer(state, action);
    expect(result).toEqual(newState);
  });
});
