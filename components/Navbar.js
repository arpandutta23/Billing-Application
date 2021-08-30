import React, { useState } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import Home from "./Auth/Home";
import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import styled from "styled-components";
import Dashboard from "./Dashboard";
import MainCustomer from "../components/customer/MainCustomer";
import MainProduct from "../components/product/MainProduct";
import MainBilling from "../components/bill/MainBilling";
import Profile from "./Profile";
import swal from "sweetalert";
import CustomerView from "./customer/CustomerView";
import img3 from "../img/img3.png";

const NavbarLink = styled.div`
  width: 100 px;
  height: 5rem;
  background-color: #F0E2FE;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Navbar = (props) => {
  const [login, setLogin] = useState(localStorage.getItem("token") || false);

  const toggleFunc = () => {
    setLogin(!login);
  };
  const handleLogout = () => {
    localStorage.clear();
    setLogin(!login);
    swal("Logged Out Successfully");
  };
  return (
    <div>
      <NavbarLink>
        <div>
          {!login ? (
            <h2 style={{ marginRight: "50rem" }}>Billing Application</h2>
          ) : (
            <img
              style={{
                width: "90px",
                height: "60px",
                paddingRight: "40rem",
              }}
              alt="avatar"
              src={img3}
            />
          )}
        </div>

        {login ? (
          <div>
            <Link className="link" to="/dashboard">
              Dashboard
            </Link>
            <Link className="link" to="/customer">
              Customers
            </Link>
            <Link className="link" to="/product">
              Product
            </Link>
            <Link className="link" to="/billing">
              Billing
            </Link>
            <Link className="link" to="/profile">
              Profile
            </Link>
            <Link className="link" onClick={handleLogout} to="/">
              Logout
            </Link>
          </div>
        ) : (
          <div>
            <Link className="link" to="/">
              Home
            </Link>
            <Link className="link" to="/register">
              Register
            </Link>
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        )}
      </NavbarLink>
      <Route path="/" exact component={Home} />
      <Route path="/register" exact component={Register} />
      <Route
        path="/login"
        exact
        render={(props) => <Login {...props} toggleFunc={toggleFunc} />}
      />
      {login ? (
        <div>
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/customer" exact component={MainCustomer} />
          <Route path="/product" exact component={MainProduct} />
          <Route path="/billing" exact component={MainBilling} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/customer/:id" exact component={CustomerView} />
        </div>
      ) : (
        <div>
          <Redirect to="/" />
        </div>
      )}
    </div>
  );
};

export default Navbar;
