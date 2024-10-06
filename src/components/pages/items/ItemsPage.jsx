import ItemsHeader from "./ItemsHeader";
import "../../../styles/items.css";
import BestProducts from "./BestProducts";
import getProducts from "../../../api/items/getProducts";
import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";

function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProduct] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();

      if (data) {
        setProducts(data);
        data.sort((a, b) => b.favoriteCount - a.favoriteCount);
        setBestProduct(data.slice(0, 4));
        console.log(bestProducts);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <ItemsHeader />
      <main className="items-wrapper">
        {console.log(bestProducts)}
        <BestProducts bestProducts={bestProducts} />
        <AllProducts products={products}/>
      </main>
    </>
  );
}

export default ItemsPage;
