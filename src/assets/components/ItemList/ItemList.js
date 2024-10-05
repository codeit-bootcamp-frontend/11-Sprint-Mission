import { useEffect, useState } from "react";
import { getProducts } from "../../../api";
import Item from "../Item/Item";

function ItemList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getProducts();
      setItems(result.list);
    };
    fetchData();
  }, []);

  console.log(items);

  return (
    <div className="ItemList">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Item item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
