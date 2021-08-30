import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { paperStyle4 } from "../style";
import { startPostCustomer, startEditCustomer } from "../../action/customeraction";
import { useDispatch } from "react-redux";

const CustomerForm = (props) => {
  const [name, setName] = useState(props.name ? props.name : "");
  const [mobile, setMobile] = useState(props.mobile ? props.mobile : "");
  const [email, setEmail] = useState(props.email ? props.email : "");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const dispatch = useDispatch();
  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "mobile") {
      setMobile(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    }
  };

  const runValidation = () => {
    if (name.trim().length === 0) {
      errors.name = "Name Cannot be Empty";
    } else if (mobile.length !== 10) {
      errors.mobile = "Invalid MobileNumber";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      mobile,
      email,
    };
    runValidation();
    if (Object.keys(errors).length === 0) {
      if (!props.id) {
        dispatch(startPostCustomer(data));
        setName("");
        setEmail("");
        setMobile("");
        setFormErrors({});
      } else {
        dispatch(startEditCustomer(props.id, data));
        props.toggleFunc();
      }
    } else {
      setFormErrors(errors);
    }
  };

  const handleCancel = () => {
    setName("");
    setEmail("");
    setMobile("");
    setFormErrors({});
  };

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle4}>
          <h2>Add Your Customers</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              label="Customer name"
              value={name}
              onChange={handleChange}
              error={Boolean(formErrors?.name)}
              helperText={formErrors?.name}
              required
            />
            <TextField
              type="number"
              name="mobile"
              label="Mobile Number"
              value={mobile}
              onChange={handleChange}
              error={Boolean(formErrors?.mobile)}
              helperText={formErrors?.mobile}
              required
            />
            <TextField
              name="email"
              type="email"
              label="Email-Id"
              value={email}
              onChange={handleChange}
              required
            />
            <Button type="submit" color="primary" variant="contained">
              {props.id ? "save" : "Add"}
            </Button>
            <Button color="default" variant="contained" onClick={handleCancel}>
              cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default CustomerForm;
