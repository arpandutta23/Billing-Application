import React from "react";
import { useSelector } from "react-redux";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const EachCustomerBill = (props) => {
  const products = useSelector((state) => state.product);
  const { customer } = props;
  let product = [];

  if (customer.lineItems?.length > 0) {
    customer.lineItems.forEach((item) => {
      const result = products.filter((product) => {
        return product._id === item.product;
      });
      product.push(result[0]);
    });
  }

  return (
    <div style={{ margin: "0.25rem" }}>
      <Table border="1" style={{ width: "150px" }}>
        <TableHead style={{ backgroundColor: "gray" }}>
          <TableRow>
            <TableCell>
              <h4>Name</h4>
            </TableCell>
            <TableCell>
              <h4>price</h4>
            </TableCell>
            <TableCell>
              <h4>quantity</h4>
            </TableCell>
            <TableCell>
              <h4>subTotal</h4>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {product.map((ptd, i) => {
            return (
              <TableRow key={i}>
                <TableCell>{ptd?.name}</TableCell>
                <TableCell>{ptd?.price}</TableCell>
                <TableCell>{customer?.lineItems[i].quantity}</TableCell>
                <TableCell>{customer?.lineItems[i].subTotal}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <h3>Total - {customer.total}</h3>
    </div>
  );
};

export default EachCustomerBill;
