import { getProducts } from "../api";
import Header from "../components/Header";
import BestProducts from "../components/BestProducts";
import AllProducts from "../components/AllProducts";
import { useEffect, useState } from "react";

const ItemsPage = () => {
  const [order, setOrder] = useState("recent");
  const [products, setProducts] = useState([]);
  const [loadingError, setLoadingError] = useState(null);

  const [bestProducts, setBestProducts] = useState([]);

  const handleLoad = async () => {
    try {
      setLoadingError(null);
      const result = await getProducts({ order });
      setProducts(result.list);
      // console.log(result.list);
      setBestProducts(
        result.list
          .slice()
          .sort((a, b) => b.favoriteCount - a.favoriteCount)
          .slice(0, 4)
      );
    } catch (e) {
      setLoadingError(e);
      return;
    }
  };

  useEffect(() => {
    handleLoad();
  }, [order]);

  return (
    <div>
      <Header isLogin={true} />
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
