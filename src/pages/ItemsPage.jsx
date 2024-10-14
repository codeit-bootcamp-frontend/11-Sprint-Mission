import { getProducts } from "../api";
import Header from "../components/Header";
import BestProducts from "../components/BestProducts";
import AllProducts from "../components/AllProducts";
import { useEffect, useState } from "react";

const ItemsPage = () => {
  const [products, setProducts] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  const handleLoad = async () => {
    try {
      setLoadingError(null);
      const result = await getProducts({ order: "recent" });
      setProducts(result.list);
    } catch (e) {
      setLoadingError(e);
      return;
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <Header isLogin={true} />
      <h2>베스트 상품</h2>
      <BestProducts products={products} />
      <h2>전체 상품</h2>
      <AllProducts products={products} />
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
};

export default ItemsPage;
