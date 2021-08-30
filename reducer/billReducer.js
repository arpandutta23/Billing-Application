const initialBill = [];

const billReducer = (state = initialBill, action) => {
  switch (action.type) {
    case "POST_BILL": {
      return [action.payload, ...state];
    }
    case "GET_BILL": {
      return [...action.payload];
    }

    default: {
      return [...state];
    }
  }
};

export default billReducer;
