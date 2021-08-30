const initialprofile = {};

const profileReducer = (state = initialprofile, action) => {
  switch (action.type) {
    case "USER_DATA": {
      return { ...state, ...action.payload };
    }
    default: {
      return { ...state };
    }
  }
};

export default profileReducer;
