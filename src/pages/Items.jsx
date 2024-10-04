import { useState, useEffect } from "react";
import { getProductsList } from "../services/panda-market-api";
import ProductsList from "../layout/ProductsList";
import "../styles/page-items/items.css";

const Items = (props) => {
  const [AllItems, setAllItems] = useState([]);
  const [RecItems, setRecItems] = useState([]);
  const [search, setSearch] = useState("");

  const handleLoad = async (options) => {
    const { list } = await getProductsList(options);
    if (options.pageSize === 4) {
      setRecItems(list);
    } else {
      setAllItems(list);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  useEffect(() => {
    handleLoad({ pageSize: 4, orderBy: "favorite" });
    handleLoad({ pageSize: 10, keyword: search });
  }, [search]);

  return (
    <main className='page-items'>
      <div className='container'>
        <ProductsList list={RecItems} imageSize='large' countSize='small' keyWordInput={false}>
          베스트 상품
        </ProductsList>
        <ProductsList list={AllItems} imageSize='middle' countSize='small' keyWordInput={true} onSubmit={handleSearchSubmit}>
          전체 상품
        </ProductsList>
      </div>
    </main>
  );
};

export default Items;
