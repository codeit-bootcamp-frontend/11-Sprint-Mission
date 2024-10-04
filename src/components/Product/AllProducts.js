import { useEffect, useState } from "react";
import { getProductsList } from "../../services/panda-market-api";
import ProductsList from "../../layout/ProductsList";

const AllProducts = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("recent");

  const handleLoad = async () => {
    const { list } = await getProductsList({ pageSize: 10, keyword: search, orderBy: order });
    setItems(list);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  const handleBestClick = () => setOrder("favorite");
  const handleNewestClick = () => setOrder("recent");

  useEffect(() => {
    handleLoad();
  }, [search, order]);

  return (
    <ProductsList
      list={items}
      imageSize='middle'
      countSize='small'
      productManagement={true}
      onSubmit={handleSearchSubmit}
      onBest={handleBestClick}
      onNewest={handleNewestClick}
    >
      전체 상품
    </ProductsList>
  );
};

export default AllProducts;
