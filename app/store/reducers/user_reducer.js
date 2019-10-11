const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {};
    default:
      return state;
  }
};

export default userReducer;
