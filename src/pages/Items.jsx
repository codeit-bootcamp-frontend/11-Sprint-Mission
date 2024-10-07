import React from "react";
import Header from "components/Header";
import BestProduct from "components/BestProductList";
import ProductList from "components/ProductList";

function Items() {
  return (
    <>
      <Header isLogin={true} />
      <main className="page-items">
        <BestProduct />
        <ProductList />
      </main>
    </>
  );
}

export default Items;
