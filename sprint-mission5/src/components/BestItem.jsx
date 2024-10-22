import "./BestItem.css";
import { getBestProducts } from "../api/api";
import ListItem from "./ItemList";
import { useEffect, useState } from "react";
import useHandleResize from "../hooks/UseDebouceSize";

const BestItem = () => {
  const [productList, setProductList] = useState([]);
  const { pageSize } = useHandleResize(true);

  const loadList = async ({ orderBy, page, pageSize }) => {
    const itmes = await getBestProducts({ orderBy, page, pageSize });
    setProductList(itmes.list);
  };
  useEffect(() => {
    loadList({ orderBy: "favorite", pageSize });
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
