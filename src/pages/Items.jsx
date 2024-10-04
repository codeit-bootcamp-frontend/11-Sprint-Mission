import { useState, useEffect } from "react";
import { getProductsList } from "../services/panda-market-api";
import ProductsList from "../layout/ProductsList";
import "../styles/page-items/items.css";

const Items = (props) => {
  const [AllItems, setAllItems] = useState([]);
  const [RecItems, setRecItems] = useState([]);

  const handleLoadAll = async () => {
    const { list } = await getProductsList();
    setAllItems(list);
  };

  const handleLoadRec = async () => {
    const { list } = await getProductsList(4);
    setRecItems(list);
  };

  useEffect(() => {
    handleLoadAll();
    handleLoadRec();
  }, []);

  return (
    <main className='page-items'>
      <div className='container'>
        <ProductsList list={RecItems} imageSize='large' countSize='small'>
          베스트 상품
        </ProductsList>
        <ProductsList list={AllItems} imageSize='middle' countSize='small'>
          전체 상품
        </ProductsList>
      </div>
    </main>
  );
};

export default Items;
