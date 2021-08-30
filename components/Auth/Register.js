import React, { useState } from "react";
import { startRegisterUser } from "../../action/userAction";
import { useDispatch } from "react-redux";
import validator from "validator";

import {
  Grid,
  Paper,
  Avatar,
  TextField,
  TextareaAutosize,
  Button,
} from "@material-ui/core";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { paperStyle, textarea, avatar } from "../style";

const Register = (props) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessname] = useState("");
  const [address, setAddress] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const errors = {};

  const handleChange = (e) => {
    if (e.target.name === "username") {
      setUserName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "businessName") {
      setBusinessname(e.target.value);
    } else if (e.target.name === "address") {
      setAddress(e.target.value);
    }
  };

  const runValidation = () => {
    if (username.length < 5) {
      errors.username = "Min of 5 characters";
    } else if (!validator.isEmail(email)) {
      errors.email = "Invalid Email Format";
    } else if (password.length < 8) {
      errors.password = "Min of 8 characters";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      businessName,
      address,
    };
    runValidation();
    if (Object.keys(errors).length === 0) {
      const handleRedirect = () => {
        props.history.push("/login");
      };
      dispatch(startRegisterUser(data, handleRedirect));

      setUserName("");
      setEmail("");
      setPassword("");
      setBusinessname("");
      setAddress("");
      setFormErrors({});
    } else {
      setFormErrors(errors);
    }
  };

  const handleCancel = () => {
    setUserName("");
    setEmail("");
    setPassword("");
    setBusinessname("");
    setAddress("");
  };

  return (
    <div>
      <Grid align="center">
        <Paper elevation={10} style={paperStyle}>
          <Avatar style={avatar}>
            <PersonAddIcon />
          </Avatar>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="User name"
              name="username"
              value={username}
              onChange={handleChange}
              error={Boolean(formErrors?.username)}
              helperText={formErrors?.username}
              fullWidth
              required
            />
            <TextField
              label="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              error={Boolean(formErrors?.email)}
              helperText={formErrors?.email}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              value={password}
              onChange={handleChange}
              error={Boolean(formErrors?.password)}
              helperText={formErrors?.password}
              type="password"
              fullWidth
              required
            />
            <TextField
              label="Business Name"
              name="businessName"
              value={businessName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextareaAutosize
              placeholder="Address*"
              name="address"
              value={address}
              onChange={handleChange}
              style={textarea}
              required
            />
            <Button type="submit" color="primary" variant="contained" fullWidth>
              Register
            </Button>
            <Button
              onClick={handleCancel}
              color="default"
              variant="contained"
              fullWidth
            >
              cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Register;
