import React, { useEffect, useState } from "react";
import {
  NativeSelect,
  Grid,
  Paper,
  TextField,
  InputLabel,
  Button,
} from "@material-ui/core";
import { paperStyle6 } from "../style";
import { useDispatch, useSelector } from "react-redux";
import { startGetCustomer } from "../../action/customeraction";
import { startGetProduct } from "../../action/productaction";
import { startLineItems, startEmptyLineItems } from "../../action/lineaction";
import { startPostBill } from "../../action/billAction";
import GenerateBill from "./GenerateBill";
import Inovice from "./Inovice";
import swal from "sweetalert";

const BillingItem = (props) => {
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState(new Date());

  const [toggle, setToggleFunc] = useState(false);
  const lineItems = useSelector((state) => state.lineItems);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetCustomer());
    dispatch(startGetProduct());
  }, []);

  const customers = useSelector((state) => state.customer);
  const products = useSelector((state) => state.product);

  const handleChangeCustomer = (e) => {
    localStorage.setItem("customer", e.target.value);
    setCustomer(e.target.value);
  };

  const handleChangeProduct = (e) => {
    if (e.target.name === "qty") {
      setQty(e.target.value);
    } else {
      setProduct(e.target.value);
    }
  };

  const handleDate = (e) => {
    localStorage.setItem("date", e.target.value);
    setDate(e.target.value);
  };

  const handleToggleFunc = () => {
    setToggleFunc(!toggle);
  };

  const handleAdd = () => {
    if (customer.length === 0) {
      swal("Pls select the customer name");
    } else if (product.length === 0) {
      swal("pls select the product");
    } else if (qty <= 0) {
      swal("Quantity Cannot be negative or Zero");
    } else {
      const data = {
        product: product,
        quantity: qty,
      };
      dispatch(startLineItems(data));
      setQty(1);
      setProduct("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      date,
      customer,
      lineItems,
    };

    if (lineItems.length > 0) {
      dispatch(startPostBill(formData));
      handleToggleFunc();
      setCustomer("");
      setProduct("");
      setQty("");
      dispatch(startEmptyLineItems());
    } else {
      swal("Add your Items before generating the bill");
    }
  };

  return (
    <div>
      <div>
        <Grid>
          <Paper elevation={20} style={paperStyle6}>
            <form onSubmit={handleSubmit}>
              <TextField
                id="date"
                label="date"
                format="yyyy-MM-dd"
                type="date"
                value={date}
                onChange={handleDate}
                required
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <InputLabel>Customer</InputLabel>
              <NativeSelect
                className="bill"
                onChange={handleChangeCustomer}
                value={customer}
                required
              >
                <option value="" />
                {customers.map((customer) => {
                  return (
                    <option key={customer._id} value={customer._id}>
                      {customer.name}
                    </option>
                  );
                })}
              </NativeSelect>
              <InputLabel>Product</InputLabel>
              <NativeSelect
                className="bill"
                onChange={handleChangeProduct}
                value={product}
              >
                <option value="" />
                {products.map((product) => {
                  return (
                    <option key={product._id} value={product._id}>
                      {product.name} - ₹ {product.price}
                    </option>
                  );
                })}
              </NativeSelect>
              <TextField
                className="bill1"
                type="number"
                label="Qty"
                value={qty}
                onChange={handleChangeProduct}
                name="qty"
                required
              />
              <Button
                type="button"
                onClick={handleAdd}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
              <br />
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "green" }}
              >
                Generate Bill
              </Button>
            </form>
          </Paper>
        </Grid>
      </div>
      <div>
        {lineItems?.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "red" }}>
            Add Products for Billing
          </h2>
        ) : (
          <div>
            <h2 style={{ textAlign: "center" }}>
              Cart Items - {lineItems.length}
            </h2>
            <div className="cardItem">
              {lineItems?.map((item, i) => {
                return <GenerateBill key={i} {...item} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div>
        {toggle && (
          <Inovice handleToggleFunc={handleToggleFunc} toggle={toggle} />
        )}
      </div>
    </div>
  );
};

export default BillingItem;
