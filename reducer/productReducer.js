const initialProduct = [];

const productReducer = (state = initialProduct, action) => {
  switch (action.type) {
    case "GET_PRODUCT": {
      return [...action.payload];
    }
    case "POST_PRODUCT": {
      return [action.payload, ...state];
    }
    case "EDIT_PRODUCT": {
      return state.map((product) => {
        if (product._id === action.payload._id) {
          return { ...product, ...action.payload };
        } else {
          return { ...product };
        }
      });
    }
    case "DELETE_PRODUCT": {
      return state.filter((customer) => {
        return customer._id !== action.payload._id;
      });
    }
    default: {
      return [...state];
    }
  }
};

export default productReducer;
