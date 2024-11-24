import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts, Product } from "../../../api/itemsApi";

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
  const [itemList, setItemList] = useState<Product[]>([]);
  const [pageSize, setPageSize] = useState<number>(getUserWidth());

  const fetchData = async ({
    orderBy,
    pageSize,
  }: {
    orderBy: string;
    pageSize: number;
  }) => {
    const products = await fetchProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  useEffect(() => {
    const handleUserWidth = () => {
      setPageSize(getUserWidth());
    };

    window.addEventListener("resize", handleUserWidth);
    fetchData({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleUserWidth);
    };
  }, [pageSize]);

  return (
    <div className="productContainer">
      <h1 className="sectionTitle">베스트 상품</h1>
      <div className="bestProductCard">
        {itemList?.map((item) => (
          <ProductCard item={item} key={`best-product-${item.id}`} />
        ))}
      </div>
    </div>
  );
}

export default BestProducts;
