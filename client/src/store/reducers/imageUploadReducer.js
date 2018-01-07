export default function (state = {}, action) {
  switch (action.type) {
    case 'SET_IMAGE_FILE':
      return {
        imageFile: action.payload
      };
    default:
      return state;
  }
}