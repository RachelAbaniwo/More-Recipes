export default (state = {}, action) => {
  switch (action.type) {
    case 'NOTIFICATION':
      return action.payload;
    default:
      return state;
  }
};
