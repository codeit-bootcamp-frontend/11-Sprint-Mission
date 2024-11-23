import React, { useEffect, useState } from "react";
// import HeartIcon from "../images/ic_heart.svg";
import ItemCard from "./ItemCard";
import { getProducts } from "../../../api/api";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // 모바일
    return 1;
  } else if (width < 1280) {
    // 태블릿
    return 2;
  } else {
    // pc
    return 4;
  }
};

function BestProduct() {
  const [itemList, setItemList] = useState([]);
  // const pageSize = 4;
  const [pageSize, setPageSize] = useState(getPageSize());

  const sortedData = async ({ orderBy, pageSize }) => {
    const products = await getProducts({ orderBy, pageSize });
    setItemList(products.list);
  };

  // useEffect(() => {
  //   sortedData({ orderBy: "favorite", pageSize });
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    // 화면 크기 변경할 때마다 pageSize를 다시 계산해 넣음
    window.addEventListener("resize", handleResize);
    sortedData({ orderBy: "favorite", pageSize });
  }, [pageSize]);

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
