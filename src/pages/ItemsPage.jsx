import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { fetchItems } from "../api";
import AllItems from "../components/AllItems";

import "./ItemsPage.css";

const ItemsPage = () => {
  const [items, setItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await fetchItems();

      setItems(data.list);
      setTotalCount(data.totalCount);
    })();
  }, []);

  return (
    <>
      <Header />
      <div className="root">
        <main className="main">
          <AllItems items={items} />
        </main>
      </div>
    </>
  );
};

export default ItemsPage;
