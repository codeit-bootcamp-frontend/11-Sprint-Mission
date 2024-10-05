import { useEffect, useState } from "react";
import { getProductsList } from "../../services/panda-market-api";
import ProductsList from "../../layout/ProductsList";

const BestProducts = () => {
  const [items, setItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setPageSize(1);
      } else if (window.matchMedia("(max-width: 1199px)").matches) {
        setPageSize(2);
      } else {
        setPageSize(4);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLoad = async () => {
    const queryParams = {
      pageSize,
      orderBy: "favorite",
    };
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getProductsList(queryParams);
    } catch (error) {
      setLoadingError(error);
    } finally {
      setIsLoading(false);
    }
    const { list } = result;
    setItems(list);
  };

  useEffect(() => {
    handleLoad();
  }, [pageSize]);

  return (
    <>
      {loadingError?.message && <span>{loadingError.message}</span>}
      <ProductsList
        list={items}
        imageSize='large'
        countSize='small'
        productManagement={false}
        isLoading={isLoading}
        className='best'
      >
        베스트 상품
      </ProductsList>
    </>
  );
};

export default BestProducts;
