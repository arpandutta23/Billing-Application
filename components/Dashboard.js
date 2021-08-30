import React, { useEffect } from "react";
import { startGetCustomer } from "../action/customeraction";
import { startGetProduct } from "../action/productaction";
import { startGetBill } from "../action/billAction";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Paper } from "@material-ui/core";
import { paperStyle3, paperStyle7 } from "./style";
import EachCustomerBill from "./customer/EachCustomerBill";
import img4 from "../img/img4.png";
import img5 from "../img/img5.png";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  let sum = 0;

  useEffect(() => {
    dispatch(startGetProduct());
    dispatch(startGetCustomer());
    dispatch(startGetBill());
  }, [dispatch]);

  const customer = useSelector((state) => state.customer);
  const product = useSelector((state) => state.product);
  const bills = useSelector((state) => state.bill);

  let last5cust = customer?.slice(customer.length - 5);
  let last5prod = product?.slice(product.length - 5);
  let last5bill = bills?.slice(bills.length - 5);
  let customerName = [];

  if (bills.length > 0) {
    bills.forEach((bill, i) => {
      sum += bill.total;
    });
  }

  if (last5bill.length > 0) {
    last5bill.forEach((bill) => {
      const result = customer?.filter((cust) => {
        return cust._id === bill.customer;
      });
      customerName.push(result[0]);
    });
  }

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Dashboard</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Customers</h1>
            <h3 className="number">{customer.length}</h3>
          </Paper>
        </Grid>

        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Products</h1>
            <h3 className="number">{product.length}</h3>
          </Paper>
        </Grid>

        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Bills</h1>
            <h3 className="number">{bills.length}</h3>
          </Paper>
        </Grid>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Grid style={{ padding: "2rem" }}>
          <Paper elevation={10} style={paperStyle3}>
            <h1>Total Sales</h1>
            <h3 className="number">{sum}</h3>
          </Paper>
        </Grid>
      </div>

      <div>
        {last5cust.length > 0 && <h3>Last 5 Added customers</h3>}
        <div style={{ display: "flex" }}>
          {last5cust?.map((cust) => {
            return (
              <Grid
                key={cust._id}
                style={{ padding: "0.5rem", backgroundColor: "#FBCA98" }}
              >
                <Paper elevation={10} style={paperStyle7}>
                  <img src={img4} width="150"></img>
                  <h4 style={{ color: "black" }}>Name - {cust.name}</h4>
                  <h4 style={{ color: "black" }}>Mobile - {cust.mobile}</h4>
                  <h4 style={{ color: "black" }}>E-mail - {cust.email}</h4>
                </Paper>
              </Grid>
            );
          })}
        </div>

        {last5prod.length > 0 && <h3>Last 5 Added Products</h3>}
        <div style={{ display: "flex" }}>
          {last5prod?.map((prod) => {
            return (
              <Grid
                key={prod._id}
                style={{ padding: "0.5rem", backgroundColor: "#FEF0E2" }}
              >
                <Paper elevation={10} style={paperStyle7}>
                  <img src={img5} height="150" width="190"></img>
                  <h4 style={{ color: "black" }}>Name - {prod.name}</h4>
                  <h4 style={{ color: "black" }}>Price - {prod.price}</h4>
                </Paper>
              </Grid>
            );
          })}
        </div>
      </div>

      <div>
        {last5bill.length > 0 && <h3>Last 5 Generated Bills</h3>}
        <div className="customerViewTable">
          {last5bill?.map((bill, i) => {
            return (
              <div key={bill._id}>
                <div>
                  <h4 style={{ color: "black" }}>
                    Name - {customerName[i]?.name}
                  </h4>
                  Date - {bill.date.slice(0, 10)}
                  <EachCustomerBill customer={bill} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
