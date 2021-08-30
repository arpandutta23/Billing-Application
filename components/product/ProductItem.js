import React, { useState } from "react";
import { Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { startDeleteProduct } from "../../action/productaction";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import Product from "./ProductForm";

const ProductItem = (props) => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const products = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    const result = window.confirm("Are you Sure");
    if (result) {
      dispatch(startDeleteProduct(id));
    }
  };

  const toggleFunc = () => {
    setOpen(!open);
  };
  const handleEdit = (product) => {
    toggleFunc();
    setId(product._id);
    setName(product.name);
    setPrice(product.price);
  };

  return (
    <div>
      <TableContainer style={{ width: "35rem", marginLeft: "25rem" }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#404040" }}>
              <TableCell>
                <h4>Name</h4>
              </TableCell>
              <TableCell align="right">
                <h4>Price</h4>
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
            {products.map((product) => {
              return (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      color="secondary"
                      variant="contained"
                      onClick={() => handleDelete(product._id)}
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
          <Product id={id} name={name} price={price} toggleFunc={toggleFunc} />
          <Button color="default" variant="contained" onClick={handleEdit}>
            close
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default ProductItem;
