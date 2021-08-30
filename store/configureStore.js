import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "../reducer/userReducer";
import profileReducer from "../reducer/profileReducer";
import customerReducer from "../reducer/customerReducer";
import productReducer from "../reducer/productReducer";
import billReducer from "../reducer/billReducer";
import lineItemReducer from "../reducer/lineItemReducer";
import currentBillReducer from "../reducer/currentBillReducer";
import thunk from "redux-thunk";

const configureStore = () => {
  const store = createStore(
    combineReducers({
      user: userReducer,
      profile: profileReducer,
      customer: customerReducer,
      product: productReducer,
      bill: billReducer,
      lineItems: lineItemReducer,
      currentBill: currentBillReducer,
    }),
    applyMiddleware(thunk)
  );

  return store;
};

export default configureStore;
