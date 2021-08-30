import axios from "../config/axios";

const getProduct = (data) => {
  return { type: "GET_PRODUCT", payload: data };
};
const postProduct = (data) => {
  return { type: "POST_PRODUCT", payload: data };
};
const editProduct = (data) => {
  return { type: "EDIT_PRODUCT", payload: data };
};
const deleteProduct = (data) => {
  return { type: "DELETE_PRODUCT", payload: data };
};

export const startGetProduct = () => {
  return (dispatch) => {
    axios
      .get("/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        const result = response.data;
        dispatch(getProduct(result.reverse()));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startPostProduct = (data) => {
  return (dispatch) => {
    axios
      .post("/products", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(postProduct(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startEditProduct = (id, data) => {
  return (dispatch) => {
    axios
      .put(`/products/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(editProduct(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};

export const startDeleteProduct = (id) => {
  return (dispatch) => {
    axios
      .delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(deleteProduct(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
