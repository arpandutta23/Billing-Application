import React, { useEffect } from "react";
import Modal from "react-modal";
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { startGetCustomer } from "../../action/customeraction";
import { startGetProduct } from "../../action/productaction";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pdf from "react-to-pdf";
const ref = React.createRef();

const Inovice = (props) => {
  const dispatch = useDispatch();
  const { handleToggleFunc } = props;
  useEffect(() => {
    dispatch(startGetCustomer());
    dispatch(startGetProduct());
  }, []);

  const products = useSelector((state) => state.product);
  const customers = useSelector((state) => state.customer);
  const currentBill = useSelector((state) => state.currentBill);
  let lineItems = currentBill?.lineItems;
  let customer = [];
  let product = [];

  const handleClose = () => {
    handleToggleFunc();
    localStorage.removeItem("formData");
  };
  const billId = localStorage.getItem("bill_id");

  if (Object.keys(currentBill).length > 0) {
    customer = customers.filter((customer) => {
      return customer._id === currentBill.customer;
    });
  }

  if (lineItems?.length > 0) {
    lineItems.forEach((item) => {
      const result = products.filter((product) => {
        return product._id === item.product;
      });
      product.push(result[0]);
    });
  }

  return (
    <div>
      <Modal isOpen={billId !== "undefined"}>
        <div ref={ref}>
            <h1>Invoice</h1>
            <h2>Date : {currentBill?.date?.slice(0, 10)}</h2>
            <h2>Customer Name : {customer[0]?.name}</h2>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ backgroundColor: "#404040" }}>
                    <TableCell>
                      <h4>Product</h4>
                    </TableCell>
                    <TableCell>
                      <h4>Price</h4>
                    </TableCell>
                    <TableCell>
                      <h4>qty</h4>
                    </TableCell>
                    <TableCell>
                      <h4>subtotal</h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.map((pdt, i) => {
                    return (
                      <TableRow key={pdt._id}>
                        <TableCell>{pdt.name}</TableCell>
                        <TableCell>{pdt.price}</TableCell>
                        <TableCell>
                          {currentBill?.lineItems[i].quantity}
                        </TableCell>
                        <TableCell>
                          {currentBill?.lineItems[i].subTotal}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <h2> Total Amount = {currentBill.total}</h2>
            <div style={{ textAlign: "center" }}>
              <Button color="secondary" onClick={handleClose}>
                close
              </Button>
            </div>
        </div>
        <Pdf targetRef={ref} filename="bill.pdf">
          {({ toPdf }) => (
            <div style={{ textAlign: "center" }}>
              <Button color="primary" onClick={toPdf}>
                Download Bill
              </Button>
            </div>
          )}
        </Pdf>
      </Modal>
    </div>
  );
};

export default Inovice;
