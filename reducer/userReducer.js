const initialUser = {};

const userReducer = (state = initialUser, action) => {
  switch (action.type) {
    default: {
      return { ...state };
    }
  }
};

export default userReducer;
