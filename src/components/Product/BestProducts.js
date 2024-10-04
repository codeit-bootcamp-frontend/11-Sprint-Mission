import { useEffect, useState } from "react";
import { getProductsList } from "../../services/panda-market-api";
import ProductsList from "../../layout/ProductsList";

const BestProducts = () => {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const { list } = await getProductsList({ pageSize: 4, orderBy: "favorite" });
    setItems(list);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <ProductsList list={items} imageSize='large' countSize='small' productManagement={false}>
      베스트 상품
    </ProductsList>
  );
};

export default BestProducts;
