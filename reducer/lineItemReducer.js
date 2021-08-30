const initialLineItem = [];

const lineItemReducer = (state = initialLineItem, action) => {
  switch (action.type) {
    case "LINE_ITEMS": {
      return [...state, action.payload];
    }
    case "DELETE_LINEITEMS": {
      return state.filter((item) => {
        return item.product !== action.payload;
      });
    }
    case "EMPTY_LINEITEMS": {
      state.length = 0;
      return [...state];
    }
    default: {
      return [...state];
    }
  }
};

export default lineItemReducer;
