import React, { useEffect } from "react";
import CustomerItem from "./CustomerItem";
import CustomerForm from "./CustomerForm";
import { startGetCustomer } from "../../action/customeraction";
import { useDispatch, useSelector } from "react-redux";

const MainCustomer = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetCustomer());
  }, []);

  const customers = useSelector((state) => state.customer);

  return (
    <div>
      <div>
        <CustomerForm />
      </div>
      <div>
        {customers.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "red" }}>
            No Existing Customer
          </h2>
        ) : (
          <CustomerItem />
        )}
      </div>
    </div>
  );
};

export default MainCustomer;
