import ProductsListList from "./ProductsList";
import { useEffect, useState } from "react";
import { getProductsList } from "../api";

function App() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    try {
      const products = await getProductsList();
      setItems(products);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <ProductsListList items={items} />
    </div>
  );
}

export default App;
