import { useEffect, useState } from "react";
import { getProducts } from "../../api";
import Item from "../Item/Item";
import "./BestItemList.css";
import { useDeviceType } from "../../contexts/DeviceTypeContext";

const PAGE_SIZE = {
  desktop: 4,
  tablet: 2,
  mobile: 1,
};

function ItemList() {
  const [items, setItems] = useState([]);
  const deviceType = useDeviceType();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts(1, PAGE_SIZE[deviceType], "favorite");
      setItems(result.list);
    };
    fetchData();
  }, [deviceType]);

  return (
    <div className="BestItemList">
      <Header />
      <Content items={items} />
    </div>
  );
}

function Header() {
  return (
    <div className="BestItemList-header">
      <h2 className="title">베스트 상품</h2>
    </div>
  );
}

function Content({ items }) {
  return (
    <ul className="BestItemList-content">
      {items.map((item) => (
        <li key={item.id}>
          <Item item={item} type="best" />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
