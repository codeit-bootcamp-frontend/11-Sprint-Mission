import React from "react";
import ProductCard from "../components/ProductCard";
import BestProducts from "../components/BestProducts";
import "./itemsPage.css";

const ItemsPage = () => {
  return (
    <div className="items-page">
      <div className="topbar-label">베스트 상품</div>
      <BestProducts />
    </div>
  );
};

export default ItemsPage;
