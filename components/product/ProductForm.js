import React, { useState } from "react";
import { Grid, Paper, TextField, Button } from "@material-ui/core";
import { paperStyle5 } from "../style";
import { startPostProduct, startEditProduct } from "../../action/productaction";
import { useDispatch } from "react-redux";

const ProductForm = (props) => {
  const [name, setName] = useState(props.name ? props.name : "");
  const [price, setPrice] = useState(props.price ? props.price : "");
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "price") {
      setPrice(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      price,
    };
    if (!props.id) {
      dispatch(startPostProduct(data));
      setName("");
      setPrice("");
    } else {
      dispatch(startEditProduct(props.id, data));
      props.toggleFunc();
    }
  };

  const handleCancel = () => {
    setName("");
    setPrice("");
  };

  return (
    <div>
      <Grid>
        <Paper elevation={20} style={paperStyle5}>
          <h2>Add Your Products</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              name="name"
              value={name}
              onChange={handleChange}
              label="Product name"
              required
            />
            <TextField
              name="price"
              type="number"
              value={price}
              onChange={handleChange}
              label="Price"
              required
            />
            <Button type="submit" color="primary" variant="contained">
              {props.id ? "save" : "Add"}
            </Button>
            <Button onClick={handleCancel} color="default" variant="contained">
              cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </div>
  );
};

export default ProductForm;
