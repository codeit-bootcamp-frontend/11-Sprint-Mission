import React from "react";
import AllProduct from "../component/AllProduct";
import BestProduct from "../component/BestProduct";

function MarketPage() {
  return (
    <div className="Section">
      <BestProduct />
      <AllProduct />
    </div>
  );
}

export default MarketPage;
