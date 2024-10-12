import Searchbox from "./Searchbox";
import ItemSubmit from "./ItemSubmit";
import DropDownbtn from "./DropDownbtn";
import "./Allitem.css";
import { getAllProducts } from "../api";
import ListItem from "./ItemList";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useMemo } from "react";
const Allitem = () => {
  const [productList, setProductList] = useState([]);
  const [order, setOrder] = useState("recent");

  const handleOrderChange = useCallback((newOrder) => {
    setOrder(newOrder);
    setIsOpen(false);
  }, []);

  const loadList = async (options) => {
    const { list } = await getAllProducts(options);
    setProductList(list);
  };

  useEffect(() => {
    loadList({ page: 1, pageSize: 10, orderBy: order });
  }, [order]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortedItems = useMemo(() => {
    return [...productList].sort((a, b) => b[order] - a[order]);
  }, [productList, order]);
  return (
    <div>
      <div className="aitop">
        <h1>전체상품</h1>
        <div className="aitop-flex">
          <Searchbox />
          <ItemSubmit />
          <DropDownbtn
            order={order}
            isOpen={isOpen}
            toggleDropdown={toggleDropdown}
            handleOrderChange={handleOrderChange}
          />
        </div>
      </div>
      <div className="allitem-con">
        {sortedItems.map((item) => (
          <ListItem item={item} key={`all-item-${item.id}`} />
        ))}
      </div>
    </div>
  );
};
export default Allitem;
