import "./BestItem.css";
import { getBestProducts } from "../api/api";
import ListItem from "./ItemList";
import { useEffect, useState } from "react";

const getPageSize = () => {
  const width = window.innerWidth;
  if (width < 768) {
    // Mobile viewport
    return 1;
  } else if (width < 1279) {
    // Tablet viewport
    return 2;
  } else {
    // Desktop viewport
    return 4;
  }
};
const BestItem = () => {
  const [productList, setProductList] = useState([]);
  const [pageSize, setPageSize] = useState(getPageSize());

  const loadList = async ({ orderBy, page, pageSize }) => {
    const itmes = await getBestProducts({ orderBy, page, pageSize });
    setProductList(itmes.list);
  };
  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener("resize", handleResize);
    loadList({ orderBy: "favorite", pageSize });

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pageSize]);
  return (
    <div className="bitop">
      <h1>베스트 상품</h1>
      <div className="best-item-con">
        {productList?.map((item) => (
          <ListItem item={item} key={`best-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
};
export default BestItem;
