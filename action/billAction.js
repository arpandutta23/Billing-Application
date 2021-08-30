import axios from "../config/axios";
import { startCurrentBill } from "./currentBillAction";

const postBill = (data) => {
  return { type: "POST_BILL", payload: data };
};
const getBill = (data) => {
  return { type: "GET_BILL", payload: data };
};

export const startPostBill = (data) => {
  return (dispatch) => {
    axios
      .post("/bills", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(postBill(response.data));
        dispatch(startCurrentBill(response.data));
        localStorage.setItem("bill_id", response.data._id);
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startGetBill = () => {
  return (dispatch) => {
    axios
      .get("/bills", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(getBill(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
