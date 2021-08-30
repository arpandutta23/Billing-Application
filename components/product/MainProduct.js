import React, { useEffect } from "react";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";
import { startGetProduct } from "../../action/productaction";
import { useDispatch, useSelector } from "react-redux";

const MainProduct = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetProduct());
  }, []);

  const products = useSelector((state) => state.product);

  return (
    <div>
      <div>
        <ProductForm />
      </div>
      <div>
        {products.length === 0 ? (
          <h2 style={{ textAlign: "center", color: "red" }}>
            No Existing Products
          </h2>
        ) : (
          <ProductItem />
        )}
      </div>
    </div>
  );
};

export default MainProduct;
