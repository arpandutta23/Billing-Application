import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { startDeleteLineItems } from "../../action/lineaction";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
//import img5 from "../../img/img5.png";

const GenerateBill = (props) => {
  const { product, quantity } = props;
  const dispatch = useDispatch();
  let productDetails = [];
  const products = useSelector((state) => state.product);

  const handleDelete = (product) => {
    const result = window.confirm("Are you Sure");
    if (result) {
      dispatch(startDeleteLineItems(product));
    }
  };

  if (product || localStorage.getItem("formData")) {
    productDetails = products.filter((pdt) => {
      return pdt._id === product;
    });
  }

  return (
    <Card
      variant="outlined"
      style={{ width: "270px", backgroundColor: "#adad85", margin: "2px" }}
    >
      <Paper elevation={20}>
        <div style={{ paddingLeft: "2rem" }}>
          
        </div>
        <CardContent>
          <Typography variant="h5" component="h2">
            Name : {productDetails[0].name} - ₹{productDetails[0].price}
          </Typography>
          <Typography variant="h5">Qty : {quantity}</Typography>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            onClick={() => handleDelete(productDetails[0]._id)}
          >
            Delete
          </Button>
        </CardActions>
      </Paper>
    </Card>
  );
};

export default GenerateBill;
