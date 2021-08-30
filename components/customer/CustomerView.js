import React, { useEffect } from "react";
import { startGetBill } from "../../action/billAction";
import { useDispatch, useSelector } from "react-redux";
import EachCustomerBill from "./EachCustomerBill";
import { startGetCustomer } from "../../action/customeraction";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const CustomerView = (props) => {
  const bills = useSelector((state) => state.bill);
  const customers = useSelector((state) => state.customer);
  let result = [];
  let particularCustomerObj = {};

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetBill());
    dispatch(startGetCustomer());
  }, []);

  if (bills.length > 0) {
    bills.forEach((bill) => {
      if (bill.customer === props.match.params.id) {
        result.push(bill);
      }
    });
  }
  if (customers.length > 0) {
    particularCustomerObj = customers.find((customer) => {
      if (customer._id === result[0]?.customer) {
        return customer;
      } else if (result.length === 0) {
        return customer._id === props.match.params.id;
      }
    });
  }

  return (
    <div>
      <div style={{ float: "right", paddingRight: "1rem" }}>
        <Link to="/customer">
          <Button>back</Button>
        </Link>
      </div>
      <h1>
        Total {result.length} orders of {particularCustomerObj?.name}
      </h1>
      <div className="customerViewTable">
        {result?.map((customer) => {
          return (
            <div key={customer._id}>
              <EachCustomerBill customer={customer} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomerView;
