import React, { useState } from "react";
import validator from "validator";
import { startLoginUser } from "../../action/userAction";
import { useDispatch } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Grid, Paper, Avatar, TextField, Button } from "@material-ui/core";
import { avatar, button, paperStyle1 } from "../style";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setformErrors] = useState({});
  const errors = {};
  const dispatch = useDispatch();

  const { toggleFunc } = props;
  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    }
  };

  const runValidation = () => {
    if (!validator.isEmail(email)) {
      errors.email = "Invalid Email Format";
    } else if (password.length < 8) {
      errors.password = "Min of 8 characters";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    runValidation();
    if (Object.keys(errors).length === 0) {
      const handleRedirect = () => {
        props.history.push("/dashboard");
        toggleFunc();
      };
      dispatch(startLoginUser(data, handleRedirect));
      setEmail("");
      setPassword("");
      setformErrors({});
    } else {
      setformErrors(errors);
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
  };
  return (
    <div style={{ marginTop: "1rem" }}>
      <Grid align="center">
        <Paper elevation={10} style={paperStyle1}>
          <Avatar style={avatar}>
            <AccountCircleIcon />
          </Avatar>
          <h2>LogIn</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              error={Boolean(formErrors?.email)}
              helperText={formErrors?.email}
              required
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              error={Boolean(formErrors?.password)}
              helperText={formErrors?.password}
              required
            />
            <br />
            <Button
              style={button}
              type="submit"
              color="primary"
              variant="contained"
            >
              Login
            </Button>
            <Button
              style={button}
              onClick={handleCancel}
              color="default"
              variant="contained"
            >
              cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default Login;
