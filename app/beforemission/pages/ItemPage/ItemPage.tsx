import React from "react";
import "./ItemPage.css";
import AllProducts from "./components/AllProducts";
import BestProducts from "./components/BestProducts";

function Items() {
  return (
    <div className="container">
      <BestProducts />
      <AllProducts />
    </div>
  );
}

export default Items;
