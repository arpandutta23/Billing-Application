import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { startDeleteCustomer } from "../../action/customeraction";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import CustomerView from "./CustomerView";
import Customer from "./CustomerForm";

const CustomerItem = (props) => {
  const [open, setOpen] = useState(false);
  const [customersView, setCustomersView] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer);

  const handleDelete = (id) => {
    const result = window.confirm("Are you Sure");
    if (result) {
      dispatch(startDeleteCustomer(id));
    }
  };
  const customerToggle = () => {
    setCustomersView(!customersView);
  };

  const handleView = () => {
    customerToggle();
  };

  const toggleFunc = () => {
    setOpen(!open);
  };
  const handleEdit = (customer) => {
    toggleFunc();
    setName(customer.name);
    setEmail(customer.email);
    setMobile(customer.mobile);
    setId(customer._id);
  };

  return (
    <div>
      <TableContainer style={{ width: "50rem", marginLeft: "17.7rem" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#404040" }}>
              <TableCell>
                <h4>Name</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Mobile Number</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Email</h4>
              </TableCell>
              <TableCell align="right">
                <h4>View</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Edit</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Delete</h4>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map((customer) => {
              return (
                <TableRow key={customer._id}>
                  <TableCell>{customer.name}</TableCell>
                  <TableCell align="right">{customer.mobile}</TableCell>
                  <TableCell align="right">{customer.email}</TableCell>
                  <TableCell align="right">
                    <Link to={`/customer/${customer._id}`} onClick={handleView}>
                      <Button>View</Button>
                    </Link>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      onClick={() => handleEdit(customer)}
                      variant="contained"
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDelete(customer._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {open && (
        <Modal isOpen={open}>
          <Customer
            id={id}
            name={name}
            mobile={mobile}
            email={email}
            toggleFunc={toggleFunc}
          />
          <Button color="default" variant="contained" onClick={handleEdit}>
            close
          </Button>
        </Modal>
      )}
      {customersView && <CustomerView />}
    </div>
  );
};

export default CustomerItem;
