import { useState, useEffect } from "react";
import { getProductsList } from "../services/panda-market-api";
import ProductsList from "../layout/ProductsList";
import "../styles/page-items/items.css";

const Items = (props) => {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const { list } = await getProductsList();
    setItems(list);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <main className='page-items'>
      <div className='container'>
        <ProductsList list={items} />
        <ProductsList list={items} />
      </div>
    </main>
  );
};

export default Items;
