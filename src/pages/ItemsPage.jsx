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
      <div>
        <h2>베스트 상품</h2>
        <BestProducts products={bestProducts} />
      </div>
      <div>
        <h2>전체 상품</h2>
        <input></input>
        <select>
          <option></option>
        </select>
        <AllProducts products={products} order={order} />
      </div>
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
};

export default ItemsPage;
