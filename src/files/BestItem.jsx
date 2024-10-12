import "./BestItem.css";
import { getBestProducts } from "../api";
import ListItem from "./ItemList";
import { useEffect, useState } from "react";

const BestItem = () => {
  const [productList, setProductList] = useState([]);

  const loadList = async (options) => {
    const { list } = await getBestProducts(options);
    setProductList(list);
  };
  useEffect(() => {
    loadList({ pageSize: 4 });
  }, []);
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
