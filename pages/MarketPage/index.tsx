import React from "react";
import AllProduct from "../../components/market/AllProduct";
import BestProduct from "../../components/market/BestProduct";

function MarketPage() {
  return (
    <div className="Section">
      <BestProduct />
      <AllProduct />
    </div>
  );
}

export default MarketPage;
