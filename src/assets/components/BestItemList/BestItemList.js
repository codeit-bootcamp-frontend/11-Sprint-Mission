import { useEffect, useState } from "react";
import { getProducts } from "../../../api";
import Item from "../Item/Item";
import "./BestItemList.css";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts(1, 4, true);
      setItems(result.list);
    };
    fetchData();
  }, []);

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
