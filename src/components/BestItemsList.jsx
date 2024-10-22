import "./BestItemsList.css";
import { useEffect, useState } from "react";
import BestItemCard from "./Card/BestItemCard";
import { getItems } from "../util/api";
import useWindowWidth from "../hooks/useWindowWidth";

function BestItemsList() {
  const [pageSize, setPageSize] = useState(4);
  const [items, setItems] = useState([]);

  const windowWidth = useWindowWidth();

  useEffect(() => {
    setPageSize(windowWidth > 1199 ? 4 : windowWidth > 767 ? 2 : 1);
  }, [windowWidth]);

  useEffect(() => {
    const fetchItems = async () => {
      const result = await getItems({ orderBy: "favorite", pageSize });
      setItems(result.list);
    };

    fetchItems();
  }, [pageSize]);

  //console.log(items);

  return (
    <div className="BestItemsList">
      <h4 className="BestItemsList__title">베스트 상품</h4>
      <section className="BestItemsList__cardSection">
        {items.map((item) => (
          <BestItemCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}

export default BestItemsList;
