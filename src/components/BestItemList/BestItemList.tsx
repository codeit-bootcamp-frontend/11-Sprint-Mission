import { useEffect, useState } from "react";
import { getProductList } from "../../api";
import ListItem from "../ListItem/ListItem";
import "./BestItemList.css";
import { useDeviceType } from "../../contexts/DeviceTypeContext";
import { Product } from "../../types/Product";

const PAGE_SIZE = {
  desktop: 4,
  tablet: 2,
  mobile: 1,
} as const;

function ItemList() {
  const [items, setItems] = useState<Product[]>([]);
  const deviceType = useDeviceType();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProductList(1, PAGE_SIZE[deviceType], "favorite");
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

function Content({ items }: { items: Product[] }) {
  return (
    <ul className="BestItemList-content">
      {items.map((item) => (
        <li key={item.id}>
          <ListItem item={item} type="best" />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
