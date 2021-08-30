const initialCustomer = [];

const customerReducer = (state = initialCustomer, action) => {
  switch (action.type) {
    case "GET_CUSTOMER": {
      return [...action.payload];
    }
    case "POST_CUSTOMER": {
      return [action.payload, ...state];
    }
    case "EDIT_CUSTOMER": {
      return state.map((customer) => {
        if (customer._id === action.payload._id) {
          return { ...customer, ...action.payload };
        } else {
          return { ...customer };
        }
      });
    }
    case "DELETE_CUSTOMER": {
      return state.filter((customer) => {
        return customer._id !== action.payload._id;
      });
    }
    default: {
      return [...state];
    }
  }
};

export default customerReducer;
