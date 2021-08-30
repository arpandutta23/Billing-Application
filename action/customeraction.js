import axios from "../config/axios";

const getCustomer = (data) => {
  return { type: "GET_CUSTOMER", payload: data };
};
const postCustomer = (data) => {
  return { type: "POST_CUSTOMER", payload: data };
};
const deleteCustomer = (data) => {
  return { type: "DELETE_CUSTOMER", payload: data };
};
const editCustomer = (data) => {
  return { type: "EDIT_CUSTOMER", payload: data };
};

export const startGetCustomer = () => {
  return (dispatch) => {
    axios
      .get("/customers", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const result = response.data
        dispatch(getCustomer(result.reverse()))
      })
      .catch((err) => {
        alert(err.message); 
      });
  };
};

export const startPostCustomer = (data) => {
  return (dispatch) => {
    axios
      .post("/customers", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(postCustomer(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startEditCustomer = (id, data) => {
  return (dispatch) => {
    axios
      .put(`/customers/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(editCustomer(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startDeleteCustomer = (id) => {
  return (dispatch) => {
    axios
      .delete(`/customers/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(deleteCustomer(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
