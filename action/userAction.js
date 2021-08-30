import axios from "../config/axios";
import swal from "sweetalert";

const getUser = (data) => {
  return { type: "USER_DATA", payload: data };
};

export const startRegisterUser = (data, handleRedirect) => {
  return (dispatch) => {
    axios
      .post("/users/register", data)
      .then((response) => {
        const result = response.data;
        if (result?.keyValue?.username) {
          swal("username already exist");
        } else if (result?.keyValue?.email) {
          swal("email id already exist");
        } else {
          handleRedirect();
          swal("Registered Successfully");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const startLoginUser = (data, handleRedirect) => {
  return (dispatch) => {
    axios
      .post("/users/login", data)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          handleRedirect();
          swal("Successfully LoggdedIn");
        } else if (response.data.errors) {
          swal("Invalid email-id or Password");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
};

export const startGetUser = () => {
  return (dispatch) => {
    axios
      .get("/users/account", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        dispatch(getUser(response.data));
      })
      .catch((err) => {
        alert(err.message);
      });
  };
};
