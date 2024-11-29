import AllProduct from "@/components/market/AllProduct";
import BestProduct from "@/components/market/BestProduct";
import React from "react";

const MarketPage = () => {
  return (
    <div className="section">
      <BestProduct />
      <AllProduct />
    </div>
  );
};

export default MarketPage;
