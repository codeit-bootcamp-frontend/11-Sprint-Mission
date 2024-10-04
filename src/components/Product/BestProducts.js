import { useEffect, useState } from "react";
import { getProductsList } from "../../services/panda-market-api";
import ProductsList from "../../layout/ProductsList";

const BestProducts = () => {
  const [items, setItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  const handleLoad = async () => {
    const queryParams = {
      pageSize: 4,
      orderBy: "favorite",
    };
    let result;
    try {
      setLoadingError(null);
      result = await getProductsList(queryParams);
    } catch (error) {
      setLoadingError(error);
    }
    const { list } = result;
    setItems(list);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <ProductsList list={items} imageSize='large' countSize='small' productManagement={false}>
        베스트 상품
      </ProductsList>
    </>
  );
};

export default BestProducts;
