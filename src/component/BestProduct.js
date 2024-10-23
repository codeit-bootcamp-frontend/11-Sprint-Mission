import React, { useEffect, useState } from "react";
// import HeartIcon from "../images/ic_heart.svg";
import ItemCard from "./ItemCard";
import { getProducts } from "../api/api";

function BestProduct() {
  const [itemList, setItemList] = useState([]);
  const pageSize = 4;

  const sortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  useEffect(() => {
    sortedData({ orderBy: "favorite", pageSize });
  }, []);

  return (
    <div className="bestItemsContainer">
      <h1>베스트 상품</h1>

      <div>
        {itemList &&
          itemList?.map((item) => (
            <ItemCard item={item} key={`best-item-${item.id}`} />
          ))}
      </div>
    </div>
  );
}

export default BestProduct;
