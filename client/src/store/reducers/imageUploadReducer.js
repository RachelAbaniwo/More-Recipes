import { SET_IMAGE_FILE, CLEAR_IMAGE_FILE } from '../actions/recipes';
/**
 * The set image upload reducer
 * @param {object} state default image upload state
 * @param {object} action action to be reduced
 * @returns {object} new state
 */
export default function (state = { imageUpload: { imageFile: null } }, action) {
  switch (action.type) {
    case SET_IMAGE_FILE:
      return {
        imageFile: action.payload
      };
    case CLEAR_IMAGE_FILE:
      return {};
    default:
      return state;
  }
}
