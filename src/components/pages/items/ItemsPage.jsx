import ItemsHeader from "./ItemsHeader";
import "../../../styles/items.css";
import BestProducts from "./BestProducts";
import getProducts from "../../../api/items/getProducts";
import { useEffect, useState } from "react";

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
      <main>
        {console.log(bestProducts)}
        <BestProducts bestProducts={bestProducts} />
        <section></section>
      </main>
    </>
  );
}

export default ItemsPage;
