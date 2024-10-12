import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts } from "../../../api/itemsApi";

const getUserWidth = () => {
  const width = window.innerWidth;
  if (width < 768) {
    return 1;
  } else if (width < 1200) {
    return 2;
  } else {
    return 4;
  }
};

function BestProducts() {
  const [productList, setProductList] = useState([]);
  const [userWidth, setUserWidth] = useState(getUserWidth());

  const fetchData = async ({ orderBy, userWidth }) => {
    const products = await fetchProducts({ orderBy, userWidth });
    setProductList(products.list);
  };

  useEffect(() => {
    const handleUserWidth = () => {
      setUserWidth(getUserWidth());
    };

    window.addEventListener("resize", handleUserWidth);
    fetchData({ orderBy: "favorite", userWidth });

    return () => {
      window.removeEventListener("resize", handleUserWidth);
    };
  }, [userWidth]);

  return (
    <div className="bestProductContainer">
      <h1 className="sectionTitle">베스트 상품</h1>
      <div className="bestProductCard">
        {productList?.map((product) => (
          <ProductCard product={product} key={`best-product-${product.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestProducts;
