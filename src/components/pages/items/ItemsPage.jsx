import ItemsHeader from "./ItemsHeader";
import "../../../styles/items.css";
import BestProducts from "./BestProducts";
import {
  getAllProducts,
  getProductsByPage,
} from "../../../api/items/productsApi.js";
import { useEffect, useState } from "react";
import AllProducts from "./AllProducts";
import PageNavigation from "./PageNavigation.jsx";

function ItemsPage() {
  const [products, setProducts] = useState([]);
  const [bestProducts, setBestProduct] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const data = await getAllProducts();
      const productData = data.list;
      const length = data.totalCount;

      if (productData) {
        productData.sort((a, b) => b.favoriteCount - a.favoriteCount);
        setBestProduct(productData.slice(0, 4));
      }

      if (length) {
        setTotalPages(Math.ceil(length / 10));
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const data = await getProductsByPage(pageNum);

      if (data) {
        setProducts(data);
      }
    }

    fetchData();
  }, [pageNum]);

  return (
    <>
      <ItemsHeader />
      <main className="items-wrapper">
        <BestProducts bestProducts={bestProducts} />
        <AllProducts products={products} />
      </main>

      <PageNavigation
        currentPage={pageNum}
        totalPages={totalPages}
        onPageChange={setPageNum}
      />
    </>
  );
}

export default ItemsPage;
