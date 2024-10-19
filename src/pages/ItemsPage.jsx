import { getProducts } from "../api";
import Header from "../components/Header";
import BestProducts from "../components/BestProducts";
import AllProducts from "../components/AllProducts";
import { useEffect, useState } from "react";

const ItemsPage = () => {
  const [order, setOrder] = useState("recent");
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProducts] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  const loadBestProducts = async () => {
    try {
      setLoadingError(null); // 에러 초기화
      const bestResult = await getProducts({ order: "favorite" });
      setBestProducts(bestResult.list.slice(0, 4));
      console.log(bestResult);
    } catch (e) {
      setLoadingError(e);
    }
  };

  const loadAllProducts = async () => {
    try {
      setLoadingError(null);
      const allResult = await getProducts({ order });
      setProducts(allResult.list);
    } catch (e) {
      setLoadingError(e);
    }
  };

  useEffect(() => {
    loadBestProducts();
  }, []);

  useEffect(() => {
    loadAllProducts();
  }, [order]);

  return (
    <div>
      <Header isLogin />
      <BestProducts products={bestProducts} />
      <AllProducts products={products} order={order} />
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
};

export default ItemsPage;
