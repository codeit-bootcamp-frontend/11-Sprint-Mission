import { useEffect, useState } from "react";
import { getProducts } from "../../../api";
import Item from "../Item/Item";
import "./ItemList.css";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts(1, 12);
      setItems(result.list);
    };
    fetchData();
  }, []);

  return (
    <div className="ItemList">
      <Header />
      <Content items={items} />
    </div>
  );
}

function Header() {
  return (
    <div className="ItemList-header">
      <h2 className="title">전체 상품</h2>
      <div className="utils">
        <input className="search" placeholder="검색할 상품을 입력해주세요" />
        <button className="btn-add">상품 등록하기</button>
        <select>
          <option>최신순</option>
          <option>좋아요순</option>
        </select>
      </div>
    </div>
  );
}

function Content({ items }) {
  return (
    <ul className="ItemList-content">
      {items.map((item) => (
        <li key={item.id}>
          <Item item={item} />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
